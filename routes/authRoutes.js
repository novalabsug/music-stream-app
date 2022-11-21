const { Router } = require("express");
const controller = require("../controller/controller");
const router = Router();
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/files");
  },
  filename: (req, file, cb) => {
    cb(null, genCode(20) + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

// router.post('/signup', controller.signup_post);
// router.post('/signin', controller.signin_post);
router.post("/music/fetch", controller.music_fetch_post);
router.post(
  "/dashboard/add-music",
  upload.single("musicFile"),
  controller.addmusic_post
);

// function to generate code
function genCode(size) {
  const codeArray = [];

  // gerenerate random integers and insert in codeArray.
  for (let i = 0; i < size; i++) {
    codeArray.push(Math.floor(Math.random() * 10));
  }

  // convert codeArray into string
  const strCode = codeArray.join("");

  // convert strCode from string to integer
  let intCode = parseInt(strCode);

  return intCode;
}

module.exports = router;
