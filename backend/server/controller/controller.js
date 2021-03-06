import jwt from "jsonwebtoken";
import userModel from "../schema/userSchema.js";
import postModel from "../schema/postsSchema.js";
import frendRequestModel from "../schema/friendRequestSchema.js";
import friendsModel from "../schema/friendsSchema.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import md5 from "md5";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filenamee = fileURLToPath(import.meta.url);
const __dirnamee = dirname(__filenamee);

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
        created_at: { joined_at: new Date(), showIntro: false },
      });
      const result = await saveUserInfo.save();
      // console.log(result);
      var token = jwt.sign({ id: result._id }, process.env.ACCESS_TOKEN_SECRET);
      res.send({
        status: 200,
        Token: token,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 403,
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
        console.table({ email: req.body.email, password: req.body.password });
        const response = await userModel.findOne({
          // email: req.body.email,
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
        res.status(505).json({ error });
      }
    }
  };

  static otp = async (req, res) => {
    const email = req.query.email;
    try {
      const isResponse = await userModel.findOne({ email });
      if (!isResponse) return res.status(404).send("Email not found");

      var otp = Math.floor(1000 + Math.random() * 9000);
      // console.log(otp);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: false,
        secureConnection: false,
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      });
      // var transporter = nodemailer.createTransport('smtps://user%myDomain.com:pass@smtp.chatappofficial70@gmail.com')
      // send email
      var mailOptions = {
        from: "chatappofficial70@gmail.com",
        to: email,
        subject: "Reset password",
        html: `Hello <b>${isResponse.firstName}  ${isResponse.lastName}<b>,
                   <p>dear <b>user<b/></p>
                   ${otp} is your Facebook-clone OTP, Pleas do not shere OTP as it is confidential.
                <br>Regards,<br>
                <br>chatapp Team<br>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("sendEmail:- " + error);
          return res.send({ otp: "send One more" });
        }
        console.log("sendEmail:- Message sent: %s", info.messageId);
        res.send({ otp: md5(otp) });
      });
      // res.send({ otp: md5(otp) });
      // console.log(otp);
    } catch (e) {
      console.log("error", e);
    }
  };
  static reset = async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    try {
      const response = await userModel.findOneAndUpdate(
        { email },
        { $set: { password } },
        { returnDocument: "after" }
      );
      console.log(response);
      await res.json("update successfuly");
    } catch (e) {
      console.log("error", e);
    }
  };

  static resentLogin = async (req, res) => {
    const user_id = req.query.id;
    try {
      const response = await userModel
        .findById(user_id)
        .select("firstName")
        .select("email")
        .select("password")
        .select("profilePic");
      res.status(200).send(response);
    } catch (error) {
      console.log("resentLogin Error:", error);
      res.status(500).send("network Error");
    }
  };

  static verify = async (req, res) => {
    try {
      const user_id = req.user.id;
      const response = await userModel.findById(user_id);
      // console.log(response);
      res.json({
        id: response._id,
        firstName: response.firstName,
        lastName: response.lastName,
        phoneNo: response.phoneNo,
        email: response.email,
        DOB: response.DOB,
        created_at: response.created_at,
        profilePic: response.profilePic,
      });
    } catch (error) {
      console.log("error:", error);
      res.send({ statu: 401, error });
    }
  };

  static bio = async (req, res) => {
    const user_id = req.user.id;
    const bio = req.body.text_bio;
    try {
      const response = await userModel.findByIdAndUpdate(user_id, { bio });
      res.json("updated");
    } catch (error) {
      console.log("Bio Error", error);
      res.json(error);
    }
  };

  static async insertPost(req, res) {
    const user_id = req.user.id;
    const text = req.body.text != "" ? req.body.text : null;
    const bg = req.body.bg ? req.body.bg : null;
    const photo = req.file ? req.file.path : null;
    const update = req.body.update;
    const id = req.body.id;
    try {
      const postData = {
        user_id,
        text,
        bg,
        photo,
        posted_at: new Date(),
      };
      console.log(update);
      if (update == "true") {
        // console.log("update");
        // console.log(id);
        const posts = await postModel.findByIdAndUpdate(
          { _id: id },
          { text: text, bg: bg, photo: photo }
        );
        const updatedPost = await postModel.findById(id);
        // console.log();
        res.json(updatedPost);
      } else if (update == "false") {
        const posts = new postModel(postData);
        const result = await posts.save();
        res.json(result);
      }
    } catch (error) {
      console.log("error :", error);
      res.json({
        status: 500,
      });
    }
  }

  static async getPosts(req, res) {
    const user_id = req.query.user_id;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      // console.log(user_id);
      const responseLength = await postModel.find({ user_id }).count();
      const response = await postModel
        .aggregate([
          { $match: { user_id: user_id } },
          { $addFields: { user_idObj: { $toObjectId: "$user_id" } } },
          {
            $lookup: {
              from: "userschemas",
              localField: "user_idObj",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          { $unwind: "$userDetails" },
          {
            $project: {
              user_id: user_id,
              userName: {
                $concat: [
                  "$userDetails.firstName",
                  " ",
                  "$userDetails.lastName",
                ],
              },
              profilePic: "$userDetails.profilePic",
              text: "$text",
              bg: "$bg",
              photo: "$photo",
              like_dislike: "$like_dislike",
              posted_at: "$posted_at",
            },
          },
        ])
        .sort({ posted_at: -1 })
        .skip(startIndex)
        .limit(limit);

      const result = {};
      if (endIndex < responseLength) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      result.data = response;
      res.json(result);
    } catch (error) {
      res.json({
        status: 500,
      });
    }
  }

  static async delete_post(req, res) {
    const postId = req.query.postId;
    try {
      const response = await postModel.findByIdAndDelete(postId);
      res.json("deleted");
    } catch (error) {
      console.log("error", error);
    }
  }

  static async getPhoto(req, res) {
    const user_id = req.query.user_id;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      let photoDataLength = await postModel
        .find({ user_id: user_id, photo: { $ne: null } })
        .count();
      const userResp = await userModel.findById(user_id, { password: 0 });

      var arr = [];
      var newLimit = limit;

      if (userResp.profilePic) {
        newLimit -= 1;
        arr.push({ _id: userResp._id, photo: userResp.profilePic });
        photoDataLength += 1;
      }
      if (userResp.profileBg) {
        arr.push({ _id: userResp._id, photo: userResp.profileBg });
        newLimit -= 1;
        photoDataLength += 1;
      }

      let photosArr = [];
      if (newLimit >= 1) {
        const userPost = await postModel
          .aggregate([
            { $match: { user_id: user_id, photo: { $ne: null } } },
            { $project: { photo: "$photo" } },
          ])
          .skip(startIndex)
          .limit(newLimit);
        photosArr = [...arr, ...userPost];
      } else photosArr = arr.slice(startIndex, endIndex);

      const result = {};
      if (endIndex < photoDataLength) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      result.data = photosArr;
      //  console.log(newLimit)
      //  console.log(photoDataLength)
      //  console.log(result)
      await res.json(result);
    } catch (error) {
      res.json({ staus: 500 });
      console.log("getohoto Error", error);
    }
  }

  static async getFriendsPost(req, res) {
    const user_id = req.user.id;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      const postResponse = await friendsModel.aggregate([
        { $match: { user_id: user_id } },
        { $addFields: { friend_idObj: { $toObjectId: "$friend_id" } } },
        {
          $lookup: {
            from: "userschemas",
            localField: "friend_idObj",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },

        {
          $lookup: {
            from: "postschemas",
            localField: "friend_id",
            foreignField: "user_id",
            as: "postDetails",
          },
        },
        { $unwind: "$postDetails" },
        {
          $project: {
            _id: 0,
            _id: "$postDetails._id",
            user_id: "$postDetails.user_id",
            userName: {
              $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
            },
            profilePic: "$userDetails.profilePic",
            text: "$postDetails.text",
            bg: "$postDetails.bg",
            photo: "$postDetails.photo",
            like_dislike: "$postDetails.like_dislike",
            posted_at: "$postDetails.posted_at",
          },
        },
        { $sort: { posted_at: -1 } },
      ]);

      const result = {};
      if (endIndex < postResponse.length) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      result.data = postResponse.slice(startIndex, endIndex);
      // console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async like_dislike(req, res) {
    const user_id = req.user.id;
    const likeDislike = req.body.likeDislike;
    const postId = req.body.postId;
    try {
      const saveLike = await postModel.findByIdAndUpdate(postId, {
        like_dislike: likeDislike,
      });
      // console.log(saveLike);
      res.json("successfully updated");
    } catch (error) {
      console.log("LIKE DISLIKE ERROR", error);
      res.json({ status: 500 });
    }
  }

  static async get_all_user(req, res) {
    const user_id = req.user.id;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      const user = await userModel.findById(user_id);
      const responsee = await userModel.aggregate([
        {
          $project: {
            _id: "$_id",
            userName: {
              $concat: ["$firstName", " ", "$lastName"],
            },
            profilePic: "$profilePic",
          },
        },
      ]);

      var response = [];
      responsee.forEach((e) => {
        if (e._id != user_id) response.push(e);
      });
      const friends = await friendsModel.find({ user_id });
      var arr = [];
      if (friends.length == 0) {
        arr = response;
      } else {
        arr = response.filter(
          ({ _id: id1 }) =>
            !friends.some(({ friend_id: id2 }) => id1.toString() === id2)
        );
      }
      const response_friendRequest = await frendRequestModel.find({
        request_id: user_id,
      });
      var allUsers = [];

      if (response_friendRequest.length == 0) {
        allUsers = arr;
        // console.log("arr");
      } else {
        allUsers = arr.filter(
          ({ _id: id1 }) =>
            !response_friendRequest.some(
              ({ user_id: id2 }) => id1.toString() === id2
            )
        );
      }

      const result = {};

      if (endIndex < allUsers.length) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      result.data = allUsers.slice(startIndex, endIndex);
      res.json(result);
    } catch (error) {
      res.json({ status: 500 });
      console.log("Error", error);
    }
  }

  static async friend_request(req, res) {
    const user_id = req.user.id;
    const request_id = req.query.requested_id;
    try {
      const frendRequestModelSave = new frendRequestModel({
        user_id,
        request_id,
      });
      const result = await frendRequestModelSave.save();
      res.json("sended");
    } catch (error) {
      res.json({ status: 500 });
    }
  }

  static async reject_friend_request(req, res) {
    const user_id = req.query.rejectUser_id;
    const request_id = req.user.id;
    try {
      const response = await frendRequestModel.findOneAndDelete({
        user_id: { $gte: user_id },
        request_id: { $gte: request_id },
      });
      res.json("rejected");
    } catch (error) {
      console.log("reject_friend_request error: ", error);
      res.json({ status: 500 });
    }
  }

  static async sended_friend_requests(req, res) {
    const user_id = req.user.id;
    try {
      const response = await frendRequestModel
        .find({ user_id })
        .select("request_id");
      res.json(response);
    } catch (error) {
      console.log("Error", error);
      res.json({ status: 500 });
    }
  }

  static async cancle_friend_request(req, res) {
    const user_id = req.user.id;
    const request_id = req.query.requested_id;

    try {
      const response = await frendRequestModel.findOneAndDelete({
        user_id: { $gte: user_id },
        request_id: { $gte: request_id },
      });
      // console.log("deleted", response);
      res.json({ response });
    } catch (error) {
      console.log("Error", error);
      res.json({ status: 500 });
    }
  }

  static async get_friend_requests(req, res) {
    const user_id = req.user.id;
    const request_id = req.query.request_id;
    try {
      const response = await frendRequestModel.findOne({ user_id, request_id });
      const requestResponse = await frendRequestModel.findOne({
        user_id: request_id,
        request_id: user_id,
      });
      var result = {};
      result.sededRequest = response ? true : false;
      result.getRequest = requestResponse ? true : false;
      res.json(result);
    } catch (error) {
      res.json({ status: 500 });
      console.log(" ERROR get_friend_request :", error);
    }
  }

  static async get_friend_requests_user(req, res) {
    const user_id = req.user.id;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    try {
      const requestsLength = await frendRequestModel.find({
        request_id: user_id,
      });
      const response = await frendRequestModel
        .aggregate([
          { $match: { request_id: user_id } },
          { $project: { userObjId: { $toObjectId: "$user_id" } } },

          {
            $lookup: {
              from: "userschemas",
              localField: "userObjId",
              foreignField: "_id",
              as: "requestDetail",
            },
          },
          { $unwind: "$requestDetail" },
          {
            $project: {
              _id: "$requestDetail._id",
              userName: {
                $concat: [
                  "$requestDetail.firstName",
                  " ",
                  "$requestDetail.lastName",
                ],
              },
              profilePic: "$requestDetail.profilePic",
            },
          },
        ])
        .skip(startIndex)
        .limit(limit);

      const result = {};
      if (endIndex < requestsLength.length) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      result.data = response;
      res.json(result);
    } catch (error) {
      res.json({ status: 500 });
      console.log(" ERROR get_friend_requests_user :", error);
    }
  }

  static async confirm_friend_request(req, res) {
    const user_id = req.user.id;
    const confirmRequestId = req.query.conform_id;
    try {
      await new friendsModel({
        user_id,
        friend_id: confirmRequestId,
      }).save();
      await new friendsModel({
        user_id: confirmRequestId,
        friend_id: user_id,
      }).save();
      await frendRequestModel.findOneAndDelete({ user_id: confirmRequestId });
      res.json("confirmed");
    } catch (error) {
      console.log("Error confirm_friend_request:", error);
      res.json({ status: 500 });
    }
  }

  static async get_friends(req, res) {
    const user_id = req.query.user_id;
    const friend_id = req.query?.friend_id;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const match = req.query.match ? String(req.query.match) : "";
    const endIndex = page * limit;
    try {
      if (page == 0 && limit == 0) {
        const response = await friendsModel.findOne({ user_id, friend_id });

        if (
          response != null &&
          response.user_id == user_id &&
          response.friend_id == friend_id
        ) {
          return res.json(true);
        } else return res.json(false);
      }

      const collectionLength = await friendsModel.aggregate([
        { $addFields: { friend_idObj: { $toObjectId: "$friend_id" } } },
        {
          $lookup: {
            from: "userschemas",
            localField: "friend_idObj",
            foreignField: "_id",
            as: "userData",
          },
        },
        { $unwind: "$userData" },
        {
          $addFields: {
            username: {
              $concat: ["$userData.firstName", " ", "$userData.lastName"],
            },
          },
        },

        {
          $match: {
            user_id: user_id,
            username: { $regex: match, $options: "i" },
          },
        },
        {
          $count: "totalCount",
        },
      ]);
      if (collectionLength.length < 1) return res.json([]);
      // const freindLengt = await collectionLength[0].totaoCount;
      // console.log("collectionLength", collectionLength);
      // console.log("freindLengt", freindLengt);
      // console.log("page", page);
      // console.log("match", match);
      const friendsResponse = await friendsModel
        .aggregate([
          { $match: { user_id: user_id } },
          { $addFields: { friend_idObj: { $toObjectId: "$friend_id" } } },
          {
            $lookup: {
              from: "userschemas",
              localField: "friend_idObj",
              foreignField: "_id",
              as: "userData",
            },
          },
          { $unwind: "$userData" },
          {
            $addFields: {
              username: {
                $concat: ["$userData.firstName", " ", "$userData.lastName"],
              },
            },
          },

          {
            $match: {
              user_id: user_id,
              username: { $regex: match, $options: "i" },
            },
          },
          {
            $project: {
              _id: 0,
              _id: "$friend_id",
              userName: {
                $concat: ["$userData.firstName", " ", "$userData.lastName"],
              },
              profilePic: "$userData.profilePic",
            },
          },
        ])
        .skip(startIndex)
        .limit(limit);

      var result = {};

      if (endIndex < (await collectionLength[0].totalCount)) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      result.data = friendsResponse;
      res.json(result);
    } catch (error) {
      console.log("get_Friend Error :", error);
    }
  }

  static async is_friend(req, res) {
    const user_id = req.user.id;
    const friend_id = req.query.friend_id;

    try {
      const response = await friendsModel.findOne({ user_id, friend_id });
      if (response) {
        res.json("freind");
      } else res.json("notFreind");
    } catch (error) {
      res.json({ status: 500 });
      console.log("is_friend Error :", error);
    }
  }

  static async get_about_info(req, res) {
    const user_id = req.query.user;
    try {
      const response = await userModel.findById(user_id, { password: 0 });
      // console.log(response);
      res.json(response);
    } catch (error) {
      console.log("get_about_info Error :", error);
    }
  }

  static async intro_Update(req, res) {
    const user_id = req.user.id;
    const homeTown = req.body.hometown;
    const currentCity = req.body.currentcity;
    const school = req.body.schoolUpdate;
    const college = req.body.collegeUpdate;
    const workPlace = req.body.workPlaceForUpdate;
    const relationship = req.body.relationship;
    const created_at = req.body.created_at;

    try {
      const response = await userModel.findByIdAndUpdate(user_id, {
        homeTown,
        currentCity,
        school,
        college,
        workPlace,
        relationship,
        created_at,
      });
      res.json("updated");
    } catch (error) {
      console.log("Intro_update Error", error);
      res.json(error);
    }
  }

  static async about_info(req, res) {
    const user_id = req.user.id;
    const currentCity = req.query?.CurrentCity;
    const homeTown = req.query?.Hometown;

    try {
      if (currentCity) {
        const response = await userModel.findByIdAndUpdate(user_id, {
          currentCity: { city: currentCity, type: "public", showIntro: false },
        });
        await res.json(response);
      } else {
        const response = await userModel.findByIdAndUpdate(user_id, {
          homeTown: { city: homeTown, type: "public", showIntro: false },
        });

        await res.json(response);
      }
    } catch (error) {
      console.log("abourInfo Error", error);
    }
  }

  static async remove(req, res) {
    const user_id = req.user.id;
    const type = req.body.type;
    const indexNo = req.body.indexNo;
    try {
      if (type == "homeTown") {
        await userModel.findByIdAndUpdate(user_id, {
          $unset: { homeTown: {} },
        });
        res.json("deleted");
      }
      if (type == "current City") {
        await userModel.findByIdAndUpdate(user_id, {
          $unset: { currentCity: {} },
        });
        res.json("deleted");
      }
      if (type == "workPlace") {
        const { _id, workPlace } = await userModel
          .findById(user_id)
          .select("workPlace");

        var newWorkPlace = [];
        workPlace.forEach((e, i) => {
          if (i != indexNo) newWorkPlace.push(e);
        });
        await userModel.findByIdAndUpdate(user_id, {
          workPlace: newWorkPlace,
        });
        res.json("deleted");
      }
      if (type == "college") {
        const { _id, college } = await userModel
          .findById(user_id)
          .select("college");

        var newcollege = [];
        college.forEach((e, i) => {
          if (i != indexNo) newcollege.push(e);
        });
        await userModel.findByIdAndUpdate(user_id, {
          college: newcollege,
        });
        res.json("deleted");
      }
      if (type == "school") {
        const { _id, school } = await userModel
          .findById(user_id)
          .select("school");

        var newcollege = [];
        school.forEach((e, i) => {
          if (i != indexNo) newcollege.push(e);
        });
        await userModel.findByIdAndUpdate(user_id, {
          school: newcollege,
        });
        res.json("deleted");
      }
      if (type == "familyMember") {
        const { _id, familyMember } = await userModel
          .findById(user_id)
          .select("familyMember");

        var newfamilyMember = [];
        familyMember.forEach((e, i) => {
          if (i != indexNo) newfamilyMember.push(e);
        });
        await userModel.findByIdAndUpdate(user_id, {
          familyMember: newfamilyMember,
        });
        res.json("deleted");
      }
    } catch (error) {
      console.log("remove Error: ", error);
    }
  }

  static async about_info_workPlace(req, res) {
    const user_id = req.user.id;
    const list_arr = req.body.newData;
    const type = req.body.type;
    try {
      if (type == "college") {
        await userModel.findByIdAndUpdate(user_id, {
          college: list_arr,
        });
        res.json("updated");
      }
      if (type == "workplace") {
        await userModel.findByIdAndUpdate(user_id, {
          workPlace: list_arr,
        });
        res.json("updated");
      }
      if (type == "school") {
        await userModel.findByIdAndUpdate(user_id, {
          school: list_arr,
        });
        res.json("updated");
      }

      if (type == "relationShip") {
        await userModel.findByIdAndUpdate(user_id, {
          relationship: list_arr,
        });
        res.json("updated");
      }
      if (type == "familyMember") {
        await userModel.findByIdAndUpdate(user_id, {
          familyMember: list_arr,
        });
        // console.log(list_arr);
        res.json("updated");
      }
    } catch (error) {
      console.log("about_info_workPlace Error", error);
      res.json({ status: 500 });
    }
  }

  static async upload_photo(req, res) {
    const user_id = req.user.id;
    const type = req.query.type;
    const filePath = req.file.path;

    try {
      // if (oldPic != "") {
      //   var oldPicname = oldPic.split("\\")[1];
      //   const testFolder = path.join(__dirnamee, "../../uploads");
      //   fs.readdirSync(testFolder).forEach((file) => {
      //     if (oldPicname == file) fs.unlinkSync(testFolder + "/" + file);
      //   });
      // }
      if (type == "profilePic") {
        const response = await userModel.findByIdAndUpdate(user_id, {
          profilePic: filePath,
        });
        // console.log(response);
        res.json(filePath);
      } else if (type == "profileBg") {
        const response = await userModel.findByIdAndUpdate(user_id, {
          profileBg: filePath,
        });
        res.json(filePath);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async Delete_photo(req, res) {
    const user_id = req.user.id;
    const type = req.query.type;
    try {
      if (type == "profilePic") {
        const response = await userModel.findByIdAndUpdate(user_id, {
          profilePic: null,
        });
        res.json("deleted");
      } else if (type == "profileBg") {
        const response = await userModel.findByIdAndUpdate(user_id, {
          profileBg: null,
        });
        res.json("deleted");
      }
    } catch (error) {
      res.json({ status: 500 });
      console.log("error", error);
    }
  }
}
export default controller;
