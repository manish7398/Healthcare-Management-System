const Doctor = require("./Doctor");

// GET ALL DOCTORS (+ optional specialization search)
exports.getAllDoctors = async (req, res, next) => {
  try {
    const { specialization } = req.query;

    let filter = {};
    if (specialization) {
      filter.specialization = {
        $regex: specialization,
        $options: "i",
      };
    }

    const doctors = await Doctor.find(filter).select(
      "-password"
    );

    res.json(doctors);
  } catch (err) {
    next(err);
  }
};
