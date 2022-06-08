'use strict';

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const { Depits } = require("../../../models/index");
const verifyJWT = require("../../middleWare/verifyJWT");

router.post("/",verifyJWT, getAll);

async function getAll(req, res, next) {
       try {
              let depits = await Depits.findAll({
                     where: {
                            userId: req.user.id
                     },
                     attributes: [ 'amount', 'description', 'date']
                    
              });

              

              if (depits) {
                     return res.status(200).json(replyBody.done({ data:depits }));
              }
       } catch (err) {
       console.log(err);
       return res.status(400).json(replyBody.error("Depit_Error", "Depit_Error"));
       }
}

module.exports = router;
