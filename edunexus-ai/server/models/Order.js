const mongoose = require("mongoose");

const SERVICE_TYPES = [
  "assignment",
  "essay",
  "thesis",
  "dissertation",
  "research_paper",
  "final_year_project",
  "presentation",
  "editing",
  "proofreading",
  "ai_assistance",
  "other",
];

const ORDER_STATUSES = [
  "pending",       // just created, awaiting payment/confirmation
  "confirmed",     // payment confirmed, awaiting expert assignment
  "in_progress",   // expert is working on it
  "review",        // delivered, under client review
  "revision",      // client requested revision
  "completed",     // fully done
  "cancelled",     // cancelled by client or admin
  "refunded",      // refund issued
];

const attachmentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String },
    filename: { type: String, required: true },
    mimeType: { type: String },
    sizeBytes: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { _id: true, timestamps: { createdAt: "uploadedAt", updatedAt: false } }
);

const revisionSchema = new mongoose.Schema(
  {
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    resolvedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    assignedExpert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Service details
    serviceType: {
      type: String,
      enum: SERVICE_TYPES,
      required: [true, "Service type is required."],
    },
    subject: { type: String, required: [true, "Subject is required."], trim: true },
    topic: { type: String, trim: true },
    description: {
      type: String,
      required: [true, "Order description is required."],
      trim: true,
      maxlength: [5000, "Description cannot exceed 5000 characters."],
    },
    wordCount: { type: Number, min: 0 },
    pageCount: { type: Number, min: 0 },
    academicLevel: {
      type: String,
      enum: ["high_school", "undergraduate", "masters", "phd", "other"],
      default: "undergraduate",
    },
    citationStyle: {
      type: String,
      enum: ["APA", "MLA", "Chicago", "Harvard", "Vancouver", "IEEE", "other", "none"],
      default: "none",
    },
    referenceCount: { type: Number, min: 0, default: 0 },

    // Deadline
    deadline: {
      type: Date,
      required: [true, "Deadline is required."],
    },
    deliveredAt: { type: Date, default: null },

    // Status
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "pending",
      index: true,
    },
    statusHistory: [
      {
        status: { type: String, enum: ORDER_STATUSES },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        note: String,
        changedAt: { type: Date, default: Date.now },
      },
    ],

    // Pricing
    budget: { type: Number, min: 0 },
    finalPrice: { type: Number, min: 0 },
    currency: { type: String, default: "USD" },
    isPaid: { type: Boolean, default: false },

    // Files
    clientFiles: [attachmentSchema],
    deliverableFiles: [attachmentSchema],

    // Revisions
    revisionLimit: { type: Number, default: 2 },
    revisions: [revisionSchema],

    // Flags
    isUrgent: { type: Boolean, default: false },
    requiresTurnitin: { type: Boolean, default: false },
    requiresAIDetectionReport: { type: Boolean, default: false },

    // Internal notes (admin/expert only)
    internalNotes: { type: String, default: "" },

    // Client rating
    rating: {
      score: { type: Number, min: 1, max: 5, default: null },
      feedback: { type: String, default: null },
      ratedAt: { type: Date, default: null },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform(_, ret) { delete ret.__v; return ret; } },
  }
);

orderSchema.index({ client: 1, status: 1 });
orderSchema.index({ assignedExpert: 1, status: 1 });
orderSchema.index({ deadline: 1 });
orderSchema.index({ orderNumber: 1 });

// Auto-generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const count = await mongoose.model("Order").countDocuments();
  const pad = String(count + 1).padStart(5, "0");
  this.orderNumber = `EDU-${Date.now().toString(36).toUpperCase()}-${pad}`;
  next();
});

orderSchema.virtual("isOverdue").get(function () {
  return this.status !== "completed" && this.status !== "cancelled" && new Date() > this.deadline;
});

orderSchema.virtual("revisionCount").get(function () {
  return this.revisions?.length ?? 0;
});

module.exports = mongoose.model("Order", orderSchema);
