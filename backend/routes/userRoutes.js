const router = require("express").Router();
const { registerUser } = require("../controllers/userController");

router.route("/register").post(registerUser);
module.exports = router;
