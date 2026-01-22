const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

// ROUTE FILES
const authRoutes = require("./authRoutes");
const doctorRoutes = require("./doctorRoutes");
const appointmentRoutes = require("./appointmentRoutes");
const reviewRoutes = require("./reviewRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reviews", reviewRoutes);

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Backend working");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
