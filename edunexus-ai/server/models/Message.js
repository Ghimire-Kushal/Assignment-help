const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String },
    filename: { type: String, required: true },
    mimeType: { type: String },
    sizeBytes: { type: Number },
  },
  { _id: true }
);

const messageSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderRole: {
      type: String,
      enum: ["student", "expert", "admin"],
      required: true,
    },
    body: {
      type: String,
      trim: true,
      maxlength: [10000, "Message body cannot exceed 10 000 characters."],
    },
    attachments: [attachmentSchema],

    // Read receipts: map of userId -> Date
    readBy: {
      type: Map,
      of: Date,
      default: {},
    },

    isSystemMessage: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_, ret) { delete ret.__v; return ret; },
    },
  }
);

messageSchema.index({ order: 1, createdAt: 1 });

module.exports = mongoose.model("Message", messageSchema);
