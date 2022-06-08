'use strict';

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const replyBody = require("../../common/replyBody");



const { Users } = require("../../../models/index");

router.post("/", login);

async function login(req, res, next) {
       try {
              let users = await Users.findOne({
                     where: {
                            userName: req.body.userName
                     }
              });
              if (users == null) {
                   return  res.status(401).json(replyBody.error("LOGIN_ERROR_USER_NOT_FOUND", "User_Not_Found"));
              } else {
                     let userData = users.dataValues;
                     const match = await bcrypt.compare(req.body.password, userData.password);
                     if (match) {
                            const token = jwt.sign(
                                   {
                                          id: userData.id,
                                          userName: userData.userName
                                   },
                                   process.env.JWT_SECRET || "MYSUPERSECRET",
                            );
                            return res.status(200).json(replyBody.done({data : token}));
                     } else {
                            return res.status(401).json(replyBody.error("LOGIN_ERROR_INVALID_PASSWORD", "Invalid Password"));
                     }
              }
       } catch (e) {
            return  res.status(401).json(replyBody.error("LOGIN_ERROR", `Login_Error`));
       }
}


module.exports = router;