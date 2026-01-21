import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors") // PUBLIC
      .then((res) => setDoctors(res.data))
      .catch(() =>
        alert("Error fetching doctors")
      );
  }, []);

  return (
    <div>
      <h2>Doctor Appointment System</h2>

      {doctors.length === 0 && (
        <p>No doctors found</p>
      )}

      {doctors.map((doc) => (
        <DoctorCard
          key={doc._id}
          doctor={doc}
        />
      ))}
    </div>
  );
};

export default Doctors;
