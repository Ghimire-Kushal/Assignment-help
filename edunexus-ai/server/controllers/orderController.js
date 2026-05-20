const { body, param, query } = require("express-validator");
const Order = require("../models/Order");
const User = require("../models/User");
const Notification = require("../models/Notification");
const { AppError } = require("../middleware/errorMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

// ─── Validation ───────────────────────────────────────────────────────────────

const createOrderValidation = [
  body("serviceType")
    .notEmpty().withMessage("Service type is required.")
    .isIn(["assignment","essay","thesis","dissertation","research_paper","final_year_project","presentation","editing","proofreading","ai_assistance","other"]),
  body("subject").trim().notEmpty().withMessage("Subject is required."),
  body("description").trim().notEmpty().withMessage("Description is required.").isLength({ max: 5000 }),
  body("deadline").notEmpty().withMessage("Deadline is required.").isISO8601().withMessage("Deadline must be a valid date."),
  body("budget").optional().isFloat({ min: 0 }).withMessage("Budget must be a positive number."),
  body("wordCount").optional().isInt({ min: 0 }),
  body("pageCount").optional().isInt({ min: 0 }),
  body("academicLevel").optional().isIn(["high_school","undergraduate","masters","phd","other"]),
  body("citationStyle").optional().isIn(["APA","MLA","Chicago","Harvard","Vancouver","IEEE","other","none"]),
  validate,
];

const updateStatusValidation = [
  param("id").isMongoId().withMessage("Invalid order ID."),
  body("status")
    .notEmpty().withMessage("Status is required.")
    .isIn(["pending","confirmed","in_progress","review","revision","completed","cancelled","refunded"]),
  body("note").optional().isString().isLength({ max: 500 }),
  validate,
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function notifyOrderChange(order, type, title, body) {
  await Notification.create({
    recipient: order.client,
    type,
    title,
    body,
    relatedOrder: order._id,
    link: `/dashboard/orders/${order._id}`,
  });
}

// ─── Controllers ──────────────────────────────────────────────────────────────

const createOrder = catchAsync(async (req, res, next) => {
  const deadline = new Date(req.body.deadline);
  if (deadline <= new Date()) return next(new AppError("Deadline must be in the future.", 400));

  const order = await Order.create({
    ...req.body,
    client: req.user.id,
    deadline,
  });

  await User.findByIdAndUpdate(req.user.id, { $inc: { orderCount: 1 } });

  await notifyOrderChange(
    order,
    "order_created",
    "Order received!",
    `Your order #${order.orderNumber} has been received and is pending confirmation.`
  );

  res.status(201).json({ success: true, order });
});

const getMyOrders = catchAsync(async (req, res) => {
  const baseQuery = Order.find({ client: req.user.id })
    .populate("assignedExpert", "name avatar")
    .lean();

  const features = new APIFeatures(baseQuery, req.query).filter().sort().paginate();
  const [orders, total] = await Promise.all([
    features.query,
    Order.countDocuments({ client: req.user.id }),
  ]);

  res.status(200).json({
    success: true,
    total,
    page: features.page,
    limit: features.limit,
    orders,
  });
});

const getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("client", "name email avatar")
    .populate("assignedExpert", "name email avatar");

  if (!order) return next(new AppError("Order not found.", 404));

  // Non-admins can only access their own orders
  if (req.user.role !== "admin" && order.client._id.toString() !== req.user.id) {
    return next(new AppError("Not authorized to view this order.", 403));
  }

  res.status(200).json({ success: true, order });
});

const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status, note } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("Order not found.", 404));

  // Only admins and the assigned expert can change status
  const isAdmin = req.user.role === "admin";
  const isExpert = order.assignedExpert?.toString() === req.user.id;
  if (!isAdmin && !isExpert) {
    return next(new AppError("Not authorized to update this order.", 403));
  }

  const prevStatus = order.status;
  order.status = status;
  order.statusHistory.push({ status, changedBy: req.user.id, note });
  if (status === "completed") order.deliveredAt = new Date();
  await order.save();

  const notifMap = {
    confirmed: ["order_confirmed", "Order confirmed", `Order #${order.orderNumber} is confirmed and an expert is being assigned.`],
    in_progress: ["order_in_progress", "Work started", `An expert has started working on order #${order.orderNumber}.`],
    review: ["order_delivered", "Ready for review", `Order #${order.orderNumber} has been delivered. Please review and approve.`],
    completed: ["order_completed", "Order completed", `Order #${order.orderNumber} is complete. Thank you!`],
    cancelled: ["order_cancelled", "Order cancelled", `Order #${order.orderNumber} has been cancelled.`],
  };

  if (notifMap[status]) {
    await notifyOrderChange(order, ...notifMap[status]);
  }

  res.status(200).json({ success: true, order, previousStatus: prevStatus });
});

const requestRevision = catchAsync(async (req, res, next) => {
  const { reason } = req.body;
  if (!reason?.trim()) return next(new AppError("Revision reason is required.", 400));

  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("Order not found.", 404));
  if (order.client.toString() !== req.user.id) return next(new AppError("Not authorized.", 403));
  if (order.status !== "review") return next(new AppError("Revisions can only be requested when order is in review.", 400));
  if (order.revisions.length >= order.revisionLimit) {
    return next(new AppError(`Revision limit (${order.revisionLimit}) reached.`, 400));
  }

  order.revisions.push({ requestedBy: req.user.id, reason });
  order.status = "revision";
  order.statusHistory.push({ status: "revision", changedBy: req.user.id, note: reason });
  await order.save();

  res.status(200).json({ success: true, order });
});

const rateOrder = catchAsync(async (req, res, next) => {
  const { score, feedback } = req.body;
  if (!score || score < 1 || score > 5) return next(new AppError("Score must be between 1 and 5.", 400));

  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("Order not found.", 404));
  if (order.client.toString() !== req.user.id) return next(new AppError("Not authorized.", 403));
  if (order.status !== "completed") return next(new AppError("You can only rate completed orders.", 400));
  if (order.rating.score) return next(new AppError("Order already rated.", 400));

  order.rating = { score, feedback, ratedAt: new Date() };
  await order.save();

  res.status(200).json({ success: true, order });
});

// ─── Admin: list all orders ────────────────────────────────────────────────────

const getAllOrders = catchAsync(async (req, res) => {
  const baseQuery = Order.find()
    .populate("client", "name email")
    .populate("assignedExpert", "name email");

  const features = new APIFeatures(baseQuery, req.query).filter().sort().paginate();
  const [orders, total] = await Promise.all([
    features.query,
    Order.countDocuments(),
  ]);

  res.status(200).json({ success: true, total, page: features.page, limit: features.limit, orders });
});

const assignExpert = catchAsync(async (req, res, next) => {
  const { expertId } = req.body;
  const expert = await User.findOne({ _id: expertId, role: "expert" });
  if (!expert) return next(new AppError("Expert not found.", 404));

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { assignedExpert: expertId, status: "confirmed" },
    { new: true, runValidators: true }
  );
  if (!order) return next(new AppError("Order not found.", 404));

  res.status(200).json({ success: true, order });
});

module.exports = {
  createOrderValidation,
  updateStatusValidation,
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  requestRevision,
  rateOrder,
  getAllOrders,
  assignExpert,
};
