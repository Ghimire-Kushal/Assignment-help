const express = require("express");
const {
  createOrderValidation,
  updateStatusValidation,
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  requestRevision,
  rateOrder,
} = require("../controllers/orderController");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.use(protect);

// Student routes
router.post("/", createOrderValidation, createOrder);
router.get("/my", getMyOrders);
router.get("/:id", getOrder);
router.post("/:id/revision", requestRevision);
router.post("/:id/rate", rateOrder);

// Upload client files to an existing order
router.post(
  "/:id/files",
  upload.array("files", 5),
  async (req, res, next) => {
    try {
      const Order = require("../models/Order");
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ success: false, message: "Order not found." });
      if (order.client.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Not authorized." });
      }

      const attachments = (req.files ?? []).map((f) => ({
        url: f.path ?? f.secure_url,
        publicId: f.filename,
        filename: f.originalname,
        mimeType: f.mimetype,
        sizeBytes: f.size,
        uploadedBy: req.user.id,
      }));

      order.clientFiles.push(...attachments);
      await order.save();
      res.status(200).json({ success: true, attachments });
    } catch (err) {
      next(err);
    }
  }
);

// Admin / expert routes
router.patch("/:id/status", restrictTo("admin", "expert"), updateStatusValidation, updateOrderStatus);

module.exports = router;
