const User = require("../schema/UserModel");
const validator = require("validator");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("name : ", name);
    console.log("email : ", email);
    console.log("password : ", password);
    console.log("req.body : ", req.body);
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

    await User.create({ name, password, email });

    await res
      .status(201)
      .send({ success: true, message: "User created successfully" });
  } catch (err) {
    await res.send({ success: false, message: err.stack });
  }
};
