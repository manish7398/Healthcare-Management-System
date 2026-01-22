import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const token = localStorage.getItem("token");

  // 🔐 GUARD: agar direct /book open kiya
  useEffect(() => {
    if (!doctor) {
      alert("Please select a doctor first");
      navigate("/");
    }
  }, [doctor, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        {
          doctorId: doctor._id,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment booked successfully");
      navigate("/");
    } catch (err) {
      alert("Booking failed");
    }
  };

  if (!doctor) return null;

  return (
    <form onSubmit={submitHandler}>
      <h2>Book Appointment</h2>

      <p>
        <b>Doctor:</b> {doctor.name}
      </p>
      <p>
        <b>Specialization:</b> {doctor.specialization}
      </p>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default BookAppointment;
