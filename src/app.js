"use strict";
const dotenv = require('dotenv');
dotenv.config({ path: require("../config/config.env") });

// 3rd Party Resources
const express = require("express");
const cors = require("cors");
const { Users, db } = require('./models/index');
const router = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send("Hello 👋🌎 - 🖥 depit server");
});

app.use("/", router);

const port = PORT;
const server = app.listen(port, () => {
    if (!port) { throw new Error('Missing Port') }
    else {
        console.log(`🌎🌎🌎🌎  ==> API Server now listening on PORT ${port}!`)
        console.log(new Date().toLocaleString());
    };
});

let currentdate = new Date();
let datetime = (currentdate.toDateString()).split(' ')[0] + "  " + currentdate.getDate() + "/" + (currentdate.toLocaleDateString()).split('/')[0] + "/" + currentdate.getFullYear() + "  "
    + currentdate.toLocaleTimeString();



db.sync()
  .then(() => {
    console.log("DataBase Connected");
    console.log(new Date().toLocaleString());
  })
  .catch(console.error);
module.exports = {
    server: app,
};