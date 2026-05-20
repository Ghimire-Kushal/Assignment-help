const mongoose = require("mongoose");

const TICKET_STATUSES = ["open", "in_progress", "waiting_on_client", "resolved", "closed"];
const TICKET_PRIORITIES = ["low", "medium", "high", "urgent"];
const TICKET_CATEGORIES = [
  "billing",
  "order_issue",
  "technical",
  "quality_complaint",
  "refund_request",
  "account",
  "other",
];

const replySchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorRole: { type: String, enum: ["student", "admin", "expert"], required: true },
    body: { type: String, required: true, trim: true, maxlength: 10000 },
    attachments: [
      {
        url: String,
        filename: String,
        mimeType: String,
      },
    ],
    isInternal: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const supportTicketSchema = new mongoose.Schema(
  {
    ticketNumber: { type: String, unique: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    relatedOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    subject: {
      type: String,
      required: [true, "Subject is required."],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      maxlength: [10000, "Description cannot exceed 10 000 characters."],
    },

    category: {
      type: String,
      enum: TICKET_CATEGORIES,
      default: "other",
    },
    priority: {
      type: String,
      enum: TICKET_PRIORITIES,
      default: "medium",
    },
    status: {
      type: String,
      enum: TICKET_STATUSES,
      default: "open",
      index: true,
    },

    replies: [replySchema],

    resolvedAt: { type: Date, default: null },
    closedAt: { type: Date, default: null },
    firstResponseAt: { type: Date, default: null },

    // Client satisfaction after resolution
    satisfactionScore: { type: Number, min: 1, max: 5, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform(_, ret) { delete ret.__v; return ret; } },
  }
);

supportTicketSchema.index({ client: 1, status: 1 });
supportTicketSchema.index({ ticketNumber: 1 });

supportTicketSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const count = await mongoose.model("SupportTicket").countDocuments();
  this.ticketNumber = `TKT-${String(count + 1).padStart(6, "0")}`;
  next();
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
