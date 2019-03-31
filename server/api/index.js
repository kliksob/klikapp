const express = require("express");
const app = express.Router();
const User = require("../models/UserModel");

app.get("/test", async (req, res, next) => {
  await User.addUser("azib", "anakwaduk");
  const usr = await User.getUser("azib");
  //console.log(User.getUser("azib").shift());
  res.print_r(usr);
});

app.all("/*", (req, res, next) => {
  res.json({
    code: 200,
    msg: "Route Not Found"
  });
});

module.exports = app;
