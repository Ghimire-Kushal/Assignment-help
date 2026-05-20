const User = require("../models/User");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const SupportTicket = require("../models/SupportTicket");
const { AppError } = require("../middleware/errorMiddleware");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

// ─── Dashboard stats ──────────────────────────────────────────────────────────

const getDashboardStats = catchAsync(async (req, res) => {
  const [
    totalUsers,
    totalOrders,
    activeOrders,
    completedOrders,
    totalRevenue,
    openTickets,
    recentOrders,
  ] = await Promise.all([
    User.countDocuments({ role: "student" }),
    Order.countDocuments(),
    Order.countDocuments({ status: { $in: ["confirmed", "in_progress", "review", "revision"] } }),
    Order.countDocuments({ status: "completed" }),
    Payment.aggregate([
      { $match: { status: "succeeded" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    SupportTicket.countDocuments({ status: { $in: ["open", "in_progress"] } }),
    Order.find()
      .sort("-createdAt")
      .limit(5)
      .populate("client", "name email")
      .lean(),
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalOrders,
      activeOrders,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total ?? 0,
      openTickets,
    },
    recentOrders,
  });
});

// ─── User management ──────────────────────────────────────────────────────────

const getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();
  const [users, total] = await Promise.all([features.query, User.countDocuments()]);
  res.status(200).json({ success: true, total, page: features.page, limit: features.limit, users });
});

const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User not found.", 404));
  res.status(200).json({ success: true, user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const allowed = ["name", "role", "isActive", "phone", "university", "country"];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  );

  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!user) return next(new AppError("User not found.", 404));

  res.status(200).json({ success: true, user });
});

const deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!user) return next(new AppError("User not found.", 404));
  res.status(200).json({ success: true, message: "User deactivated.", user });
});

// ─── Analytics ────────────────────────────────────────────────────────────────

const getRevenueAnalytics = catchAsync(async (req, res) => {
  const { period = "month" } = req.query;

  const groupId =
    period === "year"
      ? { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }
      : { year: { $year: "$createdAt" }, month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" } };

  const data = await Payment.aggregate([
    { $match: { status: "succeeded" } },
    { $group: { _id: groupId, revenue: { $sum: "$amount" }, count: { $sum: 1 } } },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    { $limit: 90 },
  ]);

  res.status(200).json({ success: true, data });
});

const getOrderAnalytics = catchAsync(async (req, res) => {
  const byStatus = await Order.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const byServiceType = await Order.aggregate([
    { $group: { _id: "$serviceType", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  res.status(200).json({ success: true, byStatus, byServiceType });
});

module.exports = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  getRevenueAnalytics,
  getOrderAnalytics,
};
