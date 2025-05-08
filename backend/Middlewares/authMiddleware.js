const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Not logged in" });
  }
  try {
    const decoded_jwt = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded_jwt.id };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
