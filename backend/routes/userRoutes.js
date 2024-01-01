const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").get(loginUser);
router.route("/logout").get(logoutUser);
module.exports = router;
