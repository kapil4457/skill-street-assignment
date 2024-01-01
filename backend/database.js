const mongoose = require("mongoose");

const database = mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to mongoDb");
  })
  .catch((err) => {
    console.log("Error : ", err);
  });

module.exports = database;
