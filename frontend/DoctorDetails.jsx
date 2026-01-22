import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/doctors/${id}`)
      .then(res => setDoctor(res.data));

    axios.get(`http://localhost:5000/api/reviews/${id}`)
      .then(res => setReviews(res.data));
  }, []);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div>
      <img src={doctor.profileImage} alt="profile" width="150" />
      <h2>{doctor.name}</h2>
      <p>{doctor.specialization}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Qualification: {doctor.qualification}</p>
      <p>Fees: ₹{doctor.fee}</p>
      <p>Rating: {doctor.ratingAverage.toFixed(1)} ⭐</p>

      <h3>Reviews</h3>
      {reviews.map(r => (
        <div key={r._id}>
          <p><b>{r.patient.name}</b> - ⭐ {r.rating}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorDetails;
