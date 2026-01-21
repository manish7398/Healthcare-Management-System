const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const authRoutes = require("./authRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// 🔥 VERY IMPORTANT (BODY PARSER)
app.use(cors());
app.use(express.json()); // ⬅️ THIS WAS THE MAIN ISSUE

// Routes
app.use("/api/auth", authRoutes);

// test route (debug)
app.get("/test", (req, res) => {
  res.send("Backend working");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
