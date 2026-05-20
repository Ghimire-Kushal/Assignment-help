const mongoose = require("mongoose");

const PAYMENT_STATUSES = ["pending", "processing", "succeeded", "failed", "refunded", "partially_refunded"];
const PAYMENT_METHODS = ["stripe", "paypal", "bank_transfer", "crypto", "manual"];

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD", uppercase: true, trim: true },

    method: {
      type: String,
      enum: PAYMENT_METHODS,
      required: true,
    },
    status: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: "pending",
      index: true,
    },

    // Gateway-specific
    stripePaymentIntentId: { type: String, default: null, index: true },
    stripeChargeId: { type: String, default: null },
    stripeCustomerId: { type: String, default: null },
    paypalOrderId: { type: String, default: null },
    gatewayResponse: { type: mongoose.Schema.Types.Mixed, select: false },

    // Refund tracking
    refundedAmount: { type: Number, default: 0 },
    refundReason: { type: String, default: null },
    refundedAt: { type: Date, default: null },

    paidAt: { type: Date, default: null },
    receiptUrl: { type: String, default: null },
    description: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: { transform(_, ret) { delete ret.__v; delete ret.gatewayResponse; return ret; } },
  }
);

paymentSchema.index({ stripePaymentIntentId: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
