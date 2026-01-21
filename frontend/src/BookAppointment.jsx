import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BookAppointment = () => {
  const { state: doctor } = useLocation();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const token = localStorage.getItem("token");

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
    } catch (error) {
      alert("Booking failed");
    }
  };

  if (!doctor) {
    return <p>No doctor selected</p>;
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Book Appointment</h2>

      <p>
        <b>Doctor:</b> {doctor.name}
      </p>
      <p>
        <b>Specialization:</b>{" "}
        {doctor.specialization}
      </p>

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        required
      />

      <input
        type="time"
        value={time}
        onChange={(e) =>
          setTime(e.target.value)
        }
        required
      />

      <button type="submit">
        Book Appointment
      </button>
    </form>
  );
};

export default BookAppointment;
