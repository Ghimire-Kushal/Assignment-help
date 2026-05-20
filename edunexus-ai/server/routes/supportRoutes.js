const express = require("express");
const {
  createTicketValidation,
  replyValidation,
  createTicket,
  getMyTickets,
  getTicket,
  replyToTicket,
  updateTicketStatus,
} = require("../controllers/supportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", createTicketValidation, createTicket);
router.get("/my", getMyTickets);
router.get("/:id", getTicket);
router.post("/:id/replies", replyValidation, replyToTicket);
router.patch("/:id/status", updateTicketStatus);

module.exports = router;
