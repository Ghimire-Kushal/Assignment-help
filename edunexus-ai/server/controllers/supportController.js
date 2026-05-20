const { body } = require("express-validator");
const SupportTicket = require("../models/SupportTicket");
const { AppError } = require("../middleware/errorMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

// ─── Validation ───────────────────────────────────────────────────────────────

const createTicketValidation = [
  body("subject").trim().notEmpty().withMessage("Subject is required.").isLength({ max: 200 }),
  body("description").trim().notEmpty().withMessage("Description is required.").isLength({ max: 10000 }),
  body("category")
    .optional()
    .isIn(["billing","order_issue","technical","quality_complaint","refund_request","account","other"]),
  body("relatedOrder").optional().isMongoId().withMessage("Invalid order ID."),
  validate,
];

const replyValidation = [
  body("body").trim().notEmpty().withMessage("Reply body is required.").isLength({ max: 10000 }),
  body("isInternal").optional().isBoolean(),
  validate,
];

// ─── Controllers ──────────────────────────────────────────────────────────────

const createTicket = catchAsync(async (req, res) => {
  const { subject, description, category, relatedOrder } = req.body;

  const ticket = await SupportTicket.create({
    client: req.user.id,
    subject,
    description,
    category: category ?? "other",
    relatedOrder: relatedOrder ?? null,
  });

  res.status(201).json({ success: true, ticket });
});

const getMyTickets = catchAsync(async (req, res) => {
  const features = new APIFeatures(
    SupportTicket.find({ client: req.user.id }).select("-replies"),
    req.query
  ).sort().paginate();

  const [tickets, total] = await Promise.all([
    features.query,
    SupportTicket.countDocuments({ client: req.user.id }),
  ]);

  res.status(200).json({ success: true, total, page: features.page, limit: features.limit, tickets });
});

const getTicket = catchAsync(async (req, res, next) => {
  const ticket = await SupportTicket.findById(req.params.id)
    .populate("client", "name email")
    .populate("assignedAgent", "name email")
    .populate("replies.author", "name avatar role");

  if (!ticket) return next(new AppError("Ticket not found.", 404));

  const isOwner = ticket.client._id.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) return next(new AppError("Not authorized.", 403));

  // Filter internal notes for non-admin
  const replies = isAdmin
    ? ticket.replies
    : ticket.replies.filter((r) => !r.isInternal);

  res.status(200).json({ success: true, ticket: { ...ticket.toJSON(), replies } });
});

const replyToTicket = catchAsync(async (req, res, next) => {
  const ticket = await SupportTicket.findById(req.params.id);
  if (!ticket) return next(new AppError("Ticket not found.", 404));

  const isOwner = ticket.client.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) return next(new AppError("Not authorized.", 403));

  // Clients cannot post internal notes
  if (req.body.isInternal && !isAdmin) {
    return next(new AppError("Only admins can post internal notes.", 403));
  }

  ticket.replies.push({
    author: req.user.id,
    authorRole: req.user.role,
    body: req.body.body.trim(),
    isInternal: req.body.isInternal ?? false,
  });

  if (!ticket.firstResponseAt && isAdmin) ticket.firstResponseAt = new Date();
  if (ticket.status === "resolved" && isOwner) ticket.status = "open";

  await ticket.save();
  await ticket.populate("replies.author", "name avatar role");

  const latest = ticket.replies[ticket.replies.length - 1];
  res.status(201).json({ success: true, reply: latest });
});

const updateTicketStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const valid = ["open", "in_progress", "waiting_on_client", "resolved", "closed"];
  if (!valid.includes(status)) return next(new AppError("Invalid status.", 400));

  const ticket = await SupportTicket.findById(req.params.id);
  if (!ticket) return next(new AppError("Ticket not found.", 404));

  ticket.status = status;
  if (status === "resolved") ticket.resolvedAt = new Date();
  if (status === "closed") ticket.closedAt = new Date();
  await ticket.save();

  res.status(200).json({ success: true, ticket });
});

// Admin only
const getAllTickets = catchAsync(async (req, res) => {
  const features = new APIFeatures(
    SupportTicket.find().populate("client", "name email").select("-replies"),
    req.query
  ).filter().sort().paginate();

  const [tickets, total] = await Promise.all([
    features.query,
    SupportTicket.countDocuments(),
  ]);

  res.status(200).json({ success: true, total, page: features.page, limit: features.limit, tickets });
});

const assignAgent = catchAsync(async (req, res, next) => {
  const { agentId } = req.body;
  const ticket = await SupportTicket.findByIdAndUpdate(
    req.params.id,
    { assignedAgent: agentId, status: "in_progress" },
    { new: true }
  );
  if (!ticket) return next(new AppError("Ticket not found.", 404));
  res.status(200).json({ success: true, ticket });
});

module.exports = {
  createTicketValidation,
  replyValidation,
  createTicket,
  getMyTickets,
  getTicket,
  replyToTicket,
  updateTicketStatus,
  getAllTickets,
  assignAgent,
};
