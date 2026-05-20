require("dotenv").config();

const express = require("express");
const http    = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

const connectDB = require("./config/database");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const supportRoutes = require("./routes/supportRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app    = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (process.env.CLIENT_URL ?? "http://localhost:3000").split(",").map((s) => s.trim()),
    credentials: true,
  },
});

// Attach io to request so controllers can emit events
app.use((req, _res, next) => { req.io = io; next(); });

// ─── Socket.io events ─────────────────────────────────────────────────────────

io.on("connection", (socket) => {
  const userId = socket.handshake.auth?.userId;
  if (userId) socket.join(`user:${userId}`);

  socket.on("join_order", (orderId) => socket.join(`order:${orderId}`));
  socket.on("leave_order", (orderId) => socket.leave(`order:${orderId}`));

  socket.on("typing_start", ({ orderId, userId: uid }) =>
    socket.to(`order:${orderId}`).emit("typing", { userId: uid, isTyping: true })
  );
  socket.on("typing_stop",  ({ orderId, userId: uid }) =>
    socket.to(`order:${orderId}`).emit("typing", { userId: uid, isTyping: false })
  );

  socket.on("disconnect", () => {
    if (userId) socket.leave(`user:${userId}`);
  });
});

// ─── Security ─────────────────────────────────────────────────────────────────

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: (origin, cb) => {
      const allowed = (process.env.CLIENT_URL ?? "http://localhost:3000").split(",").map((s) => s.trim());
      if (!origin || allowed.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed.`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Global rate limiter (per IP)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests from this IP, please try again later." },
  })
);

// ─── Body parsing ─────────────────────────────────────────────────────────────

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// Serve local uploads when Cloudinary is not configured
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Logging ──────────────────────────────────────────────────────────────────

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

// ─── Health check ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders/:orderId/messages", messageRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/admin", adminRoutes);

// ─── Error handling ───────────────────────────────────────────────────────────

app.use(notFound);
app.use(errorHandler);

// ─── Boot ─────────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT ?? "5000", 10);

async function start() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV ?? "development"} mode on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});

module.exports = app;
