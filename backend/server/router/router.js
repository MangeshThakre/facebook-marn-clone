import express from "express";
import controller from "../controller/controller.js";
const router = express.Router();
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", controller.base);

router.post("/signup", controller.signup);

router.post("/signin", controller.signin);

router.get("/verify", Authorization, controller.verify);

router.post(
  "/insert_post",
  Authorization,
  upload.single("photo"),
  controller.insertPost
);

router.get("/getPosts", Authorization, controller.getPosts);

router.post("/like_dislike", Authorization, controller.like_dislike);

router.get("/get_all_user", Authorization, controller.get_all_user);

router.get("/friend_request", Authorization, controller.friend_request);

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
