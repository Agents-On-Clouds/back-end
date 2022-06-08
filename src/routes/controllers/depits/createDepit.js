'use strict';

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const { Depits } = require("../../../models/index");
const verifyJWT = require("../../middleWare/verifyJWT");


router.post("/",verifyJWT, create);

async function create(req, res, next) {
       let requiredUserData = {
              userId : req.user.id,
              amount: req.body.amount,
              description : req.body.description,
       } 
       if(req.body.date){
              requiredUserData.date = req.body.date;
       }
       try {
              // check the inputs
              const amountRegex = /^[0-9]+$/;
              if (!amountRegex.test(requiredUserData.amount)) {
                     return res.status(403).json(replyBody.error("Depit_BadData", "amount must not contain spaces"))
              }
              let depit = await Depits.create(requiredUserData);
              if (depit) {
                     return res.status(200).json(replyBody.done({ message: "Depit added Successfully" }));
              }

       } catch (err) {
          console.log(err);
              return res.status(400).json(replyBody.error("Depit_Error", "Depit_Error"));
       }
}

module.exports = router;