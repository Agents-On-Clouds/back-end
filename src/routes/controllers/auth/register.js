'use strict';

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");



const { Users } = require("../../../models/index");


router.post("/", register);

async function register(req, res, next) {
       const requiredUserData = {
              userName: req.body.userName,
              password: req.body.password,
       }
       try {
              // check the inputs
              const usernameRegex = /^[0-9a-zA-Z_.-]+$/;
              if (!usernameRegex.test(requiredUserData.userName)) {
                     return res.status(403).json(replyBody.error("Registration_BadData", "user name must not contain spaces"))
              }
              if (requiredUserData.password.length < 3) {
                     return res.status(403).json(replyBody.error("Registration_BadData", "password must be at least 3 characters long"))
              }
              let user = await Users.create(requiredUserData);
              if (user) {
                     return res.status(200).json(replyBody.done({ message: "User Created Successfully" }));
              }

       } catch (err) {
              if (errorList[err.errorCode]) {
                     return res.status(errorList[err.errorCode]).json(err);
              }
              return res.status(400).json(replyBody.error("REGISTERATION_ERROR", "Registration_Error"));
       }
}

const errorList = {
       "USER_REGISTERATION_FAILD": 409,
       "USER_REGISTERATION_ERROR": 500,
}

module.exports = router;