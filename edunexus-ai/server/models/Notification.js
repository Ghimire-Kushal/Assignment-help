const mongoose = require("mongoose");

const NOTIFICATION_TYPES = [
  "order_created",
  "order_confirmed",
  "order_in_progress",
  "order_delivered",
  "order_completed",
  "order_cancelled",
  "revision_requested",
  "message_received",
  "payment_received",
  "payment_failed",
  "account_verified",
  "password_changed",
  "system",
];

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: NOTIFICATION_TYPES,
      required: true,
    },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },

    // Optional deep-link
    link: { type: String, default: null },

    // Related documents
    relatedOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null },
    relatedMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null },

    isRead: { type: Boolean, default: false, index: true },
    readAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { transform(_, ret) { delete ret.__v; return ret; } },
  }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

notificationSchema.methods.markRead = function () {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

module.exports = mongoose.model("Notification", notificationSchema);
