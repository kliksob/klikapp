"use strict";

require("mithril/test-utils/browserMock")(global);
global.window.XMLHttpRequest = require("w3c-xmlhttprequest").XMLHttpRequest;

// This shim to use zepto in node but with limited features
global.document = global.window.document;
global.getComputedStyle = function() {};

/*
// Uncomment this block to Use JSDOM
const { JSDOM } = require("jsdom");
global.window = new JSDOM().window;
global.document = window.document;
global.getComputedStyle = window.getComputedStyle;
*/
process.env.FLATDB_DIR = __dirname + "/__db";
const isProd = process.env.NODE_ENV === "production";
const m = require("mithril"),
  toHTML = require("mithril-node-render"),
  stringify = require("./utils/stringify"),
  express = require("express"),
  bodyParser = require("body-parser"),
  router = express.Router(),
  routes = require("../client/index.js"),
  pretty = require("pretty"),
  api = require("./api");

router.use(bodyParser.json());
router.use(stringify.middleware);
router.use("/api/v1", api);
//router.use("/admin/v1", api);
router.use("/assets", express.static("./public/assets"));
router.use("/vendor", express.static("./public/vendor"));
const sharedState = {
  hello: "Say Hello From Server"
};
Object.keys(routes).forEach(route => {
  router.get(route, (req, res, next) => {
    const attrs = Object.assign({}, req.params, req.query, {
      sharedState
    });
    const onmatch = () => m(routes[route].onmatch(attrs, req.url));
    const render = routes[route].render;
    const send = html => {
      try {
        res.type("html").send(pretty(html, { ocd: true }));
      } catch (e) {
        throw e;
      }
    };

    Promise.resolve()
      .then(onmatch)
      .then(render)
      .then(toHTML)
      .then(send)
      .catch(next);
  });
});

module.exports = router;
