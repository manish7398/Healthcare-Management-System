import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
      }}
    >
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>

      <button
        onClick={() =>
          navigate("/book", { state: doctor })
        }
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
