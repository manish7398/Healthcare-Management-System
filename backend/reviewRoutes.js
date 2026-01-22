const express = require("express");
const {
  addReview,
  getReviews,
} = require("./reviewController");
const { protect, patientOnly } = require("./authMiddleware");
const router = express.Router();

router.post("/", protect, patientOnly, addReview);
router.get("/:doctorId", getReviews);

module.exports = router;
