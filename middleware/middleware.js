const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
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
const checkUser = (req, res, next) => {
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

module.exports = { requireAuth, checkUser };
