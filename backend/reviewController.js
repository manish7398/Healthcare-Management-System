const Review = require("./Review");
const Doctor = require("./Doctor");

exports.addReview = async (req, res) => {
  const { doctorId, rating, comment } = req.body;
  const review = await Review.create({
    doctor: doctorId,
    patient: req.user.id,
    rating,
    comment,
  });

  const reviews = await Review.find({ doctor: doctorId });
  let avg = 0;
  reviews.forEach(r => (avg += r.rating));
  avg = avg / reviews.length;

  await Doctor.findByIdAndUpdate(doctorId, {
    ratingAverage: avg,
    ratingCount: reviews.length,
  });

  res.json({ message: "Review added", review });
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ doctor: req.params.doctorId })
    .populate("patient", "name");
  res.json(reviews);
};
