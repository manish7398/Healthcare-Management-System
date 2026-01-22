const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  qualification: { type: String },
  experience: { type: Number },
  clinic: { type: String },
  fee: { type: Number },
  phone: { type: String },
  profileImage: { type: String },
  ratingAverage: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Doctor", doctorSchema);
