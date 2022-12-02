import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.musicStream_JWT;

  // chceck if token jwt exists and is valid
  if (token) {
    jwt.verify(token, "music stream token", (err, decodedToken) => {
      if (err) {
        res.redirect("/account");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/account");
  }
};

// check current user
export const checkUser = (req, res, next) => {
  const token = req.cookies.musicStream_JWT;

  // check if token exists and is valid
  if (token) {
    jwt.verify(token, "music stream token", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// check current user
export const checkAdmin = (req, res, next) => {
  const token = req.cookies.musicStream_JWT;

  // check if token exists and is valid
  if (token) {
    jwt.verify(token, "music stream token", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);

        if (user.isAdmin) {
          next();
        } else {
          res.redirect("/");
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
