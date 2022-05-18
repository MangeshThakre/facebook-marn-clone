import jwt from "jsonwebtoken";
import userModel from "../schema/userSchema.js";
import postModel from "../schema/postsSchema.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { response } from "express";
dotenv.config();
class controller {
  static jwt = jsonwebtoken;

  static base = (req, res) => {
    res.send({ data: "connected" });
  };

  static signup = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNo = req.body.phone;
    const password = req.body.password;
    const email = req.body.email;
    const DOB = req.body.date;

    try {
      const emailExist = await userModel.findOne({ email });
      if (emailExist !== null)
        return res.send({
          status: 200,
          phone: true,
          result: "email already exist",
        });

      const phoneNoExist = await userModel.findOne({ phoneNo });
      if (phoneNoExist !== null)
        return res.send({ status: 200, result: "phoneNo exist" });

      const saveUserInfo = new userModel({
        firstName,
        lastName,
        email,
        phoneNo,
        password,
        DOB,
      });
      const result = await saveUserInfo.save();
      console.log(result);
      var token = jwt.sign({ id: result._id }, process.env.ACCESS_TOKEN_SECRET);
      res.send({
        status: 200,
        Token: token,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 200,
        Error: error,
      });
    }
  };

  static signin = async (req, res) => {
    if (req.body.phoneNo) {
      try {
        const response = await userModel.findOne({
          phoneNo: req.body.phoneNo,
          password: req.body.password,
        });
        if (response) {
          var token = jwt.sign(
            { id: response._id },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.send({ Token: token });
        } else res.json({ Token: "invalid" });
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
    } else if (req.body.email) {
      try {
        const response = await userModel.findOne({
          email: req.body.email,
          password: req.body.password,
        });
        if (response) {
          var token = jwt.sign(
            { id: response._id },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ Token: token });
        } else {
          res.json({ Token: "invalid" });
        }
      } catch (error) {
        console.log("error", error);
        res.json({ error });
      }
    }
  };

  static verify = async (req, res) => {
    try {
      const user_id = req.user.id;
      const response = await userModel.findById(user_id);
      console.log(response);
      res.json({
        id: response._id,
        firstName: response.firstName,
        lastName: response.lastName,
        phoneNo: response.phoneNo,
        email: response.email,
        DOB: response.DOB,
      });
    } catch (error) {
      console.log("error:", error);
      res.send({ statu: 401, error });
    }
  };

  static async insertPost(req, res) {
    const user_id = req.user.id;
    const text = req.body.text != "" ? req.body.text : null;
    const bg = req.body.bg ? req.body.bg : null;
    const photo = req.file ? req.file.path : null;
    try {
      const postData = {
        user_id,
        text,
        bg,
        photo,
        posted_at: new Date(),
      };
      const posts = new postModel(postData);
      const result = await posts.save();
      // console.log(result);
      res.json(req.body);
    } catch (error) {
      console.log("error :", error);
      res.json({
        status: 500,
      });
    }
  }

  static async getPosts(req, res) {
    const user_id = req.user.id;
    try {
      const response = await postModel.find({ user_id });
      res.json(response);
    } catch (error) {
      res.json({
        status: 500,
      });
    }
  }

  static async like_dislike(req, res) {
    const user_id = req.user.id;
    const likeDislike = req.body.likeDislike;
    const postId = req.body.postId;
    try {
      console.log(likeDislike);
      console.log(postId);

      const saveLike = await postModel.findByIdAndUpdate(postId, {
        like_dislike: likeDislike,
      });
      console.log(saveLike);
      res.json("successfully updated");
    } catch (error) {
      console.log("LIKE DISLIKE ERROR", error);
      res.json({ status: 500 });
    }
  }
}
export default controller;
