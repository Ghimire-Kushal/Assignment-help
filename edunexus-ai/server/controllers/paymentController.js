const { body } = require("express-validator");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const { AppError } = require("../middleware/errorMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

// ─── Validation ───────────────────────────────────────────────────────────────

const initiateValidation = [
  body("orderId").notEmpty().isMongoId().withMessage("Valid order ID is required."),
  body("method")
    .notEmpty()
    .isIn(["stripe", "paypal", "bank_transfer", "manual"])
    .withMessage("Invalid payment method."),
  validate,
];

// ─── Controllers ──────────────────────────────────────────────────────────────

const initiatePayment = catchAsync(async (req, res, next) => {
  const { orderId, method } = req.body;

  const order = await Order.findById(orderId);
  if (!order) return next(new AppError("Order not found.", 404));
  if (order.client.toString() !== req.user.id) return next(new AppError("Not authorized.", 403));
  if (order.isPaid) return next(new AppError("Order is already paid.", 400));
  if (!order.finalPrice) return next(new AppError("Order price has not been set yet.", 400));

  // Check for existing pending payment for this order
  const existing = await Payment.findOne({ order: orderId, status: "pending" });
  if (existing) return res.status(200).json({ success: true, payment: existing });

  const payment = await Payment.create({
    order: orderId,
    client: req.user.id,
    amount: order.finalPrice,
    currency: order.currency ?? "USD",
    method,
    description: `Payment for order #${order.orderNumber}`,
  });

  // In production: create Stripe PaymentIntent here and attach stripePaymentIntentId
  // const intent = await stripe.paymentIntents.create({ amount: ... });
  // payment.stripePaymentIntentId = intent.id;
  // await payment.save();

  res.status(201).json({ success: true, payment });
});

const confirmPayment = catchAsync(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return next(new AppError("Payment not found.", 404));
  if (payment.client.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized.", 403));
  }
  if (payment.status === "succeeded") return next(new AppError("Payment already confirmed.", 400));

  payment.status = "succeeded";
  payment.paidAt = new Date();
  await payment.save();

  // Mark the order as paid
  await Order.findByIdAndUpdate(payment.order, {
    isPaid: true,
    status: "confirmed",
  });

  res.status(200).json({ success: true, payment });
});

const getMyPayments = catchAsync(async (req, res) => {
  const features = new APIFeatures(
    Payment.find({ client: req.user.id }).populate("order", "orderNumber serviceType"),
    req.query
  ).sort().paginate();

  const [payments, total] = await Promise.all([
    features.query,
    Payment.countDocuments({ client: req.user.id }),
  ]);

  res.status(200).json({ success: true, total, page: features.page, limit: features.limit, payments });
});

const getPayment = catchAsync(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id).populate("order");
  if (!payment) return next(new AppError("Payment not found.", 404));
  if (payment.client.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized.", 403));
  }
  res.status(200).json({ success: true, payment });
});

// Admin only
const getAllPayments = catchAsync(async (req, res) => {
  const features = new APIFeatures(
    Payment.find().populate("client", "name email").populate("order", "orderNumber"),
    req.query
  ).filter().sort().paginate();

  const [payments, total] = await Promise.all([
    features.query,
    Payment.countDocuments(),
  ]);

  res.status(200).json({ success: true, total, page: features.page, limit: features.limit, payments });
});

const issueRefund = catchAsync(async (req, res, next) => {
  const { amount, reason } = req.body;
  const payment = await Payment.findById(req.params.id);
  if (!payment) return next(new AppError("Payment not found.", 404));
  if (payment.status !== "succeeded") return next(new AppError("Can only refund successful payments.", 400));

  const refundAmt = amount ?? payment.amount;
  if (refundAmt > payment.amount - payment.refundedAmount) {
    return next(new AppError("Refund amount exceeds available balance.", 400));
  }

  // In production: stripe.refunds.create({ charge: payment.stripeChargeId, amount: ... })

  payment.refundedAmount += refundAmt;
  payment.refundReason = reason ?? null;
  payment.refundedAt = new Date();
  payment.status = payment.refundedAmount >= payment.amount ? "refunded" : "partially_refunded";
  await payment.save();

  if (payment.status === "refunded") {
    await Order.findByIdAndUpdate(payment.order, { isPaid: false, status: "refunded" });
  }

  res.status(200).json({ success: true, payment });
});

module.exports = {
  initiateValidation,
  initiatePayment,
  confirmPayment,
  getMyPayments,
  getPayment,
  getAllPayments,
  issueRefund,
};
