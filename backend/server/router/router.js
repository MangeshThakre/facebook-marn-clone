import express from "express";
import controller from "../controller/controller.js";
const router = express.Router();
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filenamee = fileURLToPath(import.meta.url);
const __dirnamee = dirname(__filenamee);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + req.user.id + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", controller.base);

router.post("/signup", controller.signup);

router.post("/signin", controller.signin);

router.get("/otp", controller.otp);
router.get("/reset", controller.reset);


router.get("/verify", Authorization, controller.verify);

router.post(
  "/insert_post",
  Authorization,
  upload.single("photo"),
  controller.insertPost
);


router.post("/bio", Authorization, controller.bio);

router.get("/getPosts", Authorization, controller.getPosts);

router.get("/delete_post", Authorization, controller.delete_post);

router.get("/getPhoto", Authorization, controller.getPhoto);

router.get("/get_friends", Authorization, controller.get_friends);

router.get("/getFriendsPost", Authorization, controller.getFriendsPost);

router.post("/like_dislike", Authorization, controller.like_dislike);

router.get("/get_all_user", Authorization, controller.get_all_user);

router.get("/friend_request", Authorization, controller.friend_request);

router.get(
  "/reject_friend_request",
  Authorization,
  controller.reject_friend_request
);

router.get(
  "/sended_friend_requests",
  Authorization,
  controller.sended_friend_requests
);
router.get(
  "/cancle_friend_request",
  Authorization,
  controller.cancle_friend_request
);

router.get(
  "/get_friend_requests",
  Authorization,
  controller.get_friend_requests
);

router.get(
  "/get_friend_requests_user",
  Authorization,
  controller.get_friend_requests_user
);

router.get(
  "/confirm_friend_request",
  Authorization,
  controller.confirm_friend_request
);

router.get("/get_about_info", Authorization, controller.get_about_info);

router.get("/about_info_", Authorization, controller.about_info);

router.post("/intro_Update", Authorization, controller.intro_Update);

router.post("/remove", Authorization, controller.remove);

router.get("/is_friend", Authorization, controller.is_friend);

router.post(
  "/about_info_workPlace",
  Authorization,
  controller.about_info_workPlace
);

router.post(
  "/upload_photo",
  Authorization,
  oldPicRemover,
  upload.single("profileImg"),
  controller.upload_photo
);

router.get(
  "/Delete_photo",
  Authorization,
  oldPicRemover,
  controller.Delete_photo
);

function oldPicRemover(req, res, next) {
  const oldPic = req.query.OldProfileImg;
  if (oldPic != "") {
    var oldPicname = oldPic.split("\\")[1];
    const testFolder = path.join(__dirnamee, "../../uploads");
    fs.readdirSync(testFolder).forEach((file) => {
      if (oldPicname == file) fs.unlinkSync(testFolder + "/" + file);
    });
  }
  next();
}



function Authorization(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) res.sendStatus(403);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
export default router;
