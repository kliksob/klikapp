module.exports = {
  "/": require("./pages/HomePage"),
  "/search": require("./pages/SearchPage"),
  "/:errorPage": require("./pages/ErrorPage")
};
