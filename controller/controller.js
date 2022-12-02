import jwt from "jsonwebtoken";
import { Mongoose } from "mongoose";
// import uuid from "uuid";

import User from "../models/User.js";
import Music from "../models/Music.js";

const handleErrors = (err) => {
  let errors = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    search: "",
  };

  if (err.message === "Incorrect email") {
    errors.email = "User not found";
  }

  if (err.message === "Incorrect password") {
    errors.password = "Password is incorrect";
  }

  if (err.message === "search cannot be empty") {
    errors.search = "Please enter music name or artist name";
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

export const signup_post = async (req, res) => {
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
      res.status(200).json({ response: "SUCCESS" });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const signin_post = async (req, res) => {
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
      res.status(200).json({ response: "SUCCESS" });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const addmusic_post = async (req, res) => {
  try {
    const { title, artist, trackLength } = req.body;

    const music = await Music.create({
      title,
      artist,
      album: req.files.album[0].filename,
      trackLength,
      filename: req.files.musicFile[0].filename,
    });

    // Music.watch().on("change", (data) => {
    //   console.log(data);
    // });

    if (music) {
      res.status(200).json({ response: "SUCCESS" });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const music_fetch_post = async (req, res) => {
  try {
    const music = await Music.find();

    res.status(200).json({ music });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const music_search_post = async (req, res) => {
  try {
    const { search } = req.body;

    if (search === "")
      return res
        .status(400)
        .json({ errors: { search: "Please enter music name or artist name" } });

    const MusicArr = await Music.find();
    let music = [];

    MusicArr.forEach((musicObj) => {
      console.log(musicObj.title.toLowerCase().indexOf(search.toLowerCase()));
      if (musicObj.title.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
        music.push(musicObj);
      }

      if (musicObj.artist.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
        music.push(musicObj);
      }
    });

    res.status(200).json({ music });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const artist_fetch_get = async (req, res) => {
  try {
    const MusicArr = await Music.find();
    const Artists = [];

    MusicArr.forEach((music) => {
      Artists.push(music.artist);
    });

    const artists = Artists.filter(
      (artist, index, key) => key.indexOf(artist) === index
    );

    console.log(artists);

    res.status(200).json({ artists });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
