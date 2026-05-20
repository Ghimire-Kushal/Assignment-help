const { body } = require("express-validator");
const Message = require("../models/Message");
const Order = require("../models/Order");
const Notification = require("../models/Notification");
const { AppError } = require("../middleware/errorMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const catchAsync = require("../utils/catchAsync");

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function assertOrderAccess(orderId, userId, role) {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Order not found.", 404);

  const isClient = order.client.toString() === userId;
  const isExpert = order.assignedExpert?.toString() === userId;
  const isAdmin = role === "admin";

  if (!isClient && !isExpert && !isAdmin) {
    throw new AppError("Not authorized to message on this order.", 403);
  }
  return order;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const sendValidation = [
  body("body")
    .if((value, { req }) => !req.file && !req.files?.length)
    .notEmpty()
    .withMessage("Message body is required when no file is attached."),
  validate,
];

// ─── Controllers ──────────────────────────────────────────────────────────────

const getMessages = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  await assertOrderAccess(orderId, req.user.id, req.user.role);

  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 50);

  const [messages, total] = await Promise.all([
    Message.find({ order: orderId, isDeleted: false })
      .populate("sender", "name avatar role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Message.countDocuments({ order: orderId, isDeleted: false }),
  ]);

  res.status(200).json({ success: true, total, page, limit, messages: messages.reverse() });
});

const sendMessage = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await assertOrderAccess(orderId, req.user.id, req.user.role);

  if (!req.body.body?.trim() && (!req.files || req.files.length === 0)) {
    return next(new AppError("Message body or attachment is required.", 400));
  }

  const attachments = (req.files ?? []).map((f) => ({
    url: f.path ?? f.secure_url,
    publicId: f.filename,
    filename: f.originalname,
    mimeType: f.mimetype,
    sizeBytes: f.size,
  }));

  const message = await Message.create({
    order: orderId,
    sender: req.user.id,
    senderRole: req.user.role,
    body: req.body.body?.trim() ?? "",
    attachments,
  });

  await message.populate("sender", "name avatar role");

  // Notify the other party
  const recipientId =
    req.user.id === order.client.toString()
      ? order.assignedExpert
      : order.client;

  if (recipientId) {
    await Notification.create({
      recipient: recipientId,
      type: "message_received",
      title: "New message",
      body: `${req.user.name} sent a message on order #${order.orderNumber}.`,
      relatedOrder: order._id,
      relatedMessage: message._id,
      link: `/dashboard/orders/${order._id}`,
    });
  }

  res.status(201).json({ success: true, message });
});

const markRead = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  await assertOrderAccess(orderId, req.user.id, req.user.role);

  await Message.updateMany(
    {
      order: orderId,
      isDeleted: false,
      [`readBy.${req.user.id}`]: { $exists: false },
    },
    { $set: { [`readBy.${req.user.id}`]: new Date() } }
  );

  res.status(200).json({ success: true, message: "Messages marked as read." });
});

const deleteMessage = catchAsync(async (req, res, next) => {
  const msg = await Message.findById(req.params.messageId);
  if (!msg) return next(new AppError("Message not found.", 404));

  const isOwner = msg.sender.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) return next(new AppError("Not authorized.", 403));

  msg.isDeleted = true;
  msg.deletedAt = new Date();
  await msg.save();

  res.status(200).json({ success: true, message: "Message deleted." });
});

module.exports = { sendValidation, getMessages, sendMessage, markRead, deleteMessage };
