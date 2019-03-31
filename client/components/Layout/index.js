module.exports = process.browser
  ? require("./Browser.js")
  : require("./Server.js");