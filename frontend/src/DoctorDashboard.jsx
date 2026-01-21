import axios from "axios";
import { useEffect, useState } from "react";
import socket from "./socket";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments/doctor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAppointments(res.data.appointments || res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard">
      <h2>Doctor Dashboard</h2>
      {appointments.length === 0 && (
        <p>No appointments yet</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
