import { Router } from "express";
import {
  signin_post,
  signup_post,
  music_fetch_post,
  music_search_post,
  addmusic_post,
  artist_fetch_get,
  artist_music_fetch_post,
} from "../controller/controller.js";
const router = Router();
import multer from "multer";

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/files");
  },
  filename: (req, file, cb) => {
    cb(null, genCode(20) + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

const multipleUpload = upload.fields([
  { name: "album", maxCount: 1 },
  { name: "musicFile", maxCount: 1 },
]);

router.post("/accounts/signup", signup_post);
router.post("/accounts/signin", signin_post);
router.get("/fetch/music-data", music_fetch_post);
router.post("/fetch/search-data", music_search_post);
router.post("/fetch/music-data", multipleUpload, addmusic_post);
router.get("/fetch/artist-data", artist_fetch_get);
router.post("/fetch/artist/music-data", artist_music_fetch_post);

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

export default router;
