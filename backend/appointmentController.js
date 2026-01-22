const Appointment = require("./Appointment");

/*
====================================================
PATIENT → Book Appointment
====================================================
*/
exports.bookAppointment = async (req, res, next) => {
  try {
    const { doctorId, date, time } = req.body;

    // 🔒 Basic validation
    if (!doctorId || !date || !time) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time,
      status: "pending",
    });

    // 🔌 Socket → notify doctor
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    const doctorSocket = onlineUsers.get(doctorId);
    if (doctorSocket) {
      io.to(doctorSocket).emit("newAppointment", {
        message: "New appointment received",
        appointment,
      });
    }

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

/*
====================================================
DOCTOR → View His Appointments
====================================================
*/
exports.getDoctorAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
    })
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

/*
====================================================
DOCTOR → Accept / Reject Appointment
====================================================
*/
exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    // 🔒 Status validation
    if (!["accepted", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findById(
      req.params.id
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    // 🔌 Socket → notify patient
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    const patientSocket = onlineUsers.get(
      appointment.patient.toString()
    );

    if (patientSocket) {
      io.to(patientSocket).emit(
        "appointmentStatusUpdate",
        {
          message: `Appointment ${status}`,
          appointment,
        }
      );
    }

    res.json({
      success: true,
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

/*
====================================================
PATIENT → Appointment History
====================================================
*/
exports.getPatientAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};