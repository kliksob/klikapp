const FlatDb = require("flat-db");
const assert = require("assert");
const bcrypt = require("bcrypt");
const DB = new FlatDb.Collection("user", {
  username: "",
  password: ""
});

const getUser = function(username) {
  const match = DB.find()
    .equals("username", username)
    .run();
  if (match.length) return match.shift();
  return false;
};
const addUser = async function(username, passwd) {
  const password = await bcrypt.hash(passwd, 10);
  const user = getUser(username);
  if (user) return false;
  DB.add({
    username,
    password
  });
  return getUser(username);
};

module.exports = {
  DB,
  getUser,
  addUser
};
