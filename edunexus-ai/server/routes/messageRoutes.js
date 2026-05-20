const express = require("express");
const {
  sendValidation,
  getMessages,
  sendMessage,
  markRead,
  deleteMessage,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

const router = express.Router({ mergeParams: true });

router.use(protect);

// All routes are scoped under /orders/:orderId/messages
router.get("/", getMessages);
router.post("/", upload.array("attachments", 3), sendValidation, sendMessage);
router.patch("/read", markRead);
router.delete("/:messageId", deleteMessage);

module.exports = router;
