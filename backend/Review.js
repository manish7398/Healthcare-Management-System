const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
