const express = require("express");
const router = express.Router();
const { getAllDoctors } = require("./doctorController");

// 🔓 PUBLIC route
router.get("/", getAllDoctors);

module.exports = router;
