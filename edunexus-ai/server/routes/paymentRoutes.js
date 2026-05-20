const express = require("express");
const {
  initiateValidation,
  initiatePayment,
  confirmPayment,
  getMyPayments,
  getPayment,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/initiate", initiateValidation, initiatePayment);
router.get("/my", getMyPayments);
router.get("/:id", getPayment);
router.patch("/:id/confirm", confirmPayment);

module.exports = router;
