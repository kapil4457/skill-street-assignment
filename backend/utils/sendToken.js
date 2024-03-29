const sendToken = async (user, statusCode, res, message) => {
  const token = await user.getJWTTokens();

  //options for cookie
  console.log();

  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    message: message,
    user,
    token,
  });
};

module.exports = sendToken;
