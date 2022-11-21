const jwt = require("jsonwebtoken");
const { Mongoose } = require("mongoose");
const uuid = require("uuid");

const User = require("../models/User");
const Music = require("../models/Music");

const handleErrors = (err) => {
  let errors = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  };

  if (err.message === "Incorrect email") {
    errors.email = "User not found";
  }

  if (err.message === "Incorrect password") {
    errors.password = "Password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }

  // validating user errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create tokens
const maxAge = 2 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "music stream token", { expiresIn: maxAge });
};

module.exports.signup_post = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      email,
      phone,
      password,
    });

    if (user) {
      res.status(200).json({ user });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.signin_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    if (user) {
      const token = createToken(user._id);
      res.cookie("musicStream_JWT", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        secure: true,
      });
      res.status(200).json({ user });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.addmusic_post = async (req, res) => {
  try {
    const { title, artist, album, trackLength } = req.body;

    const filename = req.file.filename;

    const music = await Music.create({
      title,
      artist,
      album,
      trackLength,
      filename,
    });

    if (music) {
      res.status(200).json({ response: "success" });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.music_fetch_post = async (req, res) => {
  try {
    const music = await Music.find();

    res.status(200).json({ music });
  } catch (error) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
