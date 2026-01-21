const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token failed" });
  }
};

exports.doctorOnly = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ message: "Doctor access only" });
  }
  next();
};

exports.patientOnly = (req, res, next) => {
  if (req.user.role !== "patient") {
    return res.status(403).json({ message: "Patient access only" });
  }
  next();
};
