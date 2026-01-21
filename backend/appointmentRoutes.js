const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("./appointmentController");

const {
  protect,
  doctorOnly,
  patientOnly,
} = require("./authMiddleware");

// Patient
router.post("/", protect, patientOnly, bookAppointment);

// Doctor
router.get(
  "/doctor",
  protect,
  doctorOnly,
  getDoctorAppointments
);

router.put(
  "/:id",
  protect,
  doctorOnly,
  updateAppointmentStatus
);
// Patient appointment history
router.get(
  "/patient",
  protect,
  patientOnly,
  require("./appointmentController").getPatientAppointments
);

module.exports = router;
