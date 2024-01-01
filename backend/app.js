const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

// .env config
dotenv.config({
  path: __dirname + "/.env",
});

// database
require("./database");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// Routers
const note = require("./routes/noteRoutes.js");
const user = require("./routes/userRoutes.js");

app.use("/api/v1/", note);
app.use("/api/v1/user/", user);
// Listening to port
app.listen(process.env.PORT, () => {
  console.log(`Listening on port : ${process.env.PORT} `);
});
