const User = require("../schema/UserModel");
const validator = require("validator");
const sendToken = require("../utils/sendToken");
// Register a new User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check : If all values are provided
    if (!name || !email || !password) {
      await res
        .status(400)
        .send({ success: false, message: "Please fill in all the details" });
      return;
    }

    // Check : If the given email is in correct format

    if (!validator.isEmail(email)) {
      await res
        .status(400)
        .send({ success: false, message: "Please enter a valid email" });
      return;
    }

    // Check : Email is not empty
    if (validator.isEmpty(email)) {
      await res
        .status(400)
        .send({ success: false, message: "Email can not be empty" });
      return;
    }
    // Check : Password is not empty
    if (validator.isEmpty(password)) {
      await res
        .status(400)
        .send({ success: false, message: "Password can not be empty" });
      return;
    }

    // Check : Name is not empty
    if (validator.isEmpty(name)) {
      await res
        .status(400)
        .send({ success: false, message: "Name can not be empty" });
      return;
    }

    // Check : "name" should of length 3 to 20 characters
    if (!validator.isLength(name, { min: 3, max: 20 })) {
      await res.status(400).send({
        success: false,
        message: "Name should be in the range of 3-20 characters",
      });
      return;
    }
    // Check : "name" should be of minimum length 10 characters
    if (!validator.isLength(password, { min: 3 })) {
      await res.status(400).send({
        success: false,
        message: "Name should be in the range of 3-20 characters",
      });
      return;
    }

    // Check :  If user already exists
    const user = User.find({ email });
    if (user) {
      await res.status(400).send({
        success: false,
        message:
          "User already exists with this email. Please sign-in or use another email.",
      });
      return;
    }

    await User.create({ name, password, email });

    sendToken(user, 201, res, "User created successfully");
    return;
  } catch (err) {
    await res.status(401).send({ success: false, message: err.stack });
    return;
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check : If all values are provided
    if (!email || !password) {
      await res
        .status(400)
        .send({ success: false, message: "Please fill in all the details" });
      return;
    }

    // Check : If the user exists
    const user = await User.findOne({ email });
    if (!user) {
      await res
        .status(400)
        .send({ success: false, message: "Invalid email or password." });
      return;
    }

    // Check : Is the password correct ?
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      await res
        .status(400)
        .send({ success: false, message: "Invalid email or password." });
      return;
    }

    sendToken(user, 200, res, "Logged-in successfully");
  } catch (err) {
    await res.status(400).send({ success: false, message: err.stack });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    // Remove the cookie
    await res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return await res
      .status(200)
      .send({ success: false, message: "Logged-out successfully." });
  } catch (err) {
    return await res.status(400).send({ success: false, message: err.stack });
  }
};
