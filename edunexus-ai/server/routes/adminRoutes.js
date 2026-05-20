const express = require("express");
const {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  getRevenueAnalytics,
  getOrderAnalytics,
} = require("../controllers/adminController");
const {
  getAllOrders,
  assignExpert,
  updateOrderStatus,
  updateStatusValidation,
} = require("../controllers/orderController");
const { getAllPayments, issueRefund } = require("../controllers/paymentController");
const { getAllTickets, assignAgent } = require("../controllers/supportController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, restrictTo("admin"));

// Dashboard
router.get("/dashboard", getDashboardStats);

// Analytics
router.get("/analytics/revenue", getRevenueAnalytics);
router.get("/analytics/orders", getOrderAnalytics);

// Users
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);
router.patch("/users/:id/deactivate", deactivateUser);

// Orders
router.get("/orders", getAllOrders);
router.patch("/orders/:id/status", updateStatusValidation, updateOrderStatus);
router.patch("/orders/:id/assign-expert", assignExpert);

// Payments
router.get("/payments", getAllPayments);
router.post("/payments/:id/refund", issueRefund);

// Support tickets
router.get("/tickets", getAllTickets);
router.patch("/tickets/:id/assign", assignAgent);

module.exports = router;
