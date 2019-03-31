//if (process.browser) {
const $ = require("zepto-modules/_min");
require("zepto-modules/fx");
require("zepto-modules/fx_methods");
$.extend($.fx.speeds, {
  fast: 200,
  slow: 400,
  _default: 250
});
module.exports = $;
/*} else {
  module.exports = require("zepto-modules/_min");
}*/
