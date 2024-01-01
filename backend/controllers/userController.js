const User = require("../schema/UserModel");
const validator = require("validator");
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

    await res
      .status(201)
      .send({ success: true, message: "User created successfully" });
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

    await res
      .status(200)
      .send({ success: true, message: "Logged-in successfully." });
  } catch (err) {
    await res.status(400).send({ success: false, message: err.stack });
  }
};
