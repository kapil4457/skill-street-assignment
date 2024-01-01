const User = require("../schema/UserModel");
const validator = require("validator");
const sendToken = require("../utils/sendToken");
// Register a new User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      await res
        .status(400)
        .send({ success: false, message: "Please fill in all the details" });
      return;
    }

    if (!validator.isEmail(email)) {
      await res
        .status(400)
        .send({ success: false, message: "Please enter a valid email" });
      return;
    }

    if (validator.isEmpty(password)) {
      await res
        .status(400)
        .send({ success: false, message: "Password can not be empty" });
      return;
    }

    if (validator.isEmpty(name)) {
      await res
        .status(400)
        .send({ success: false, message: "Name can not be empty" });
      return;
    }
    if (!validator.isLength(name, { min: 3, max: 20 })) {
      await res.status(400).send({
        success: false,
        message: "Name should be in the range of 3-20 characters",
      });
      return;
    }

    // check if user already exists
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

// Login as a user

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      await res
        .status(400)
        .send({ success: false, message: "Please fill in all the details" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      await res
        .status(400)
        .send({ success: false, message: "Invalid email or password." });
      return;
    }

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
