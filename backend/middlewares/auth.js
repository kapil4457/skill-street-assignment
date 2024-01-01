const jwt = require("jsonwebtoken");
const User = require("../schema/UserModel");
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res
        .status(401)
        .send({ success: false, message: "Please Login to access this page" });
      return;
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};
