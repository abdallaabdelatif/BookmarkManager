const jwt = require("jsonwebtoken");
const { promisify } = require("util");

let auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Please log in first" });
  }
  try {
    let decoded = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.staus(401).json({ message: "Not authenticated" });
  }
};
module.exports = { auth };
