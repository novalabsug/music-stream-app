const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
// const custom = require("./custom/custom");
// const { requireAuth, checkUser } = require("./middleware/middleware");
require("dotenv").config();
const morgan = require("morgan");

const app = express();

// set template engine
app.set("view engine", "ejs");

// set middlewares
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/music-stream", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
  )
  .catch((err) => console.log(err));

// Set routes
// app.get("*", checkUser);
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/dashboard", (req, res) => {
//   res.render("dashboard");
// });

// app.get("/dashboard/add-music", (req, res) => {
//   res.render("add-music");
// });

app.get("/account", (req, res) => {
  res.render("account");
});

app.get("/404", (req, res) => {
  res.render("404");
});
app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).redirect("/404");
});
