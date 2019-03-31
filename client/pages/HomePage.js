const m = require("mithril");
const Layout = require("../components/Layout");
const request = require("../request.js");

module.exports = {
  oninit({ attrs }) {
    attrs.head.title("Hello Klik");
    //console.log(window.location.origin)
  },
  view(vnode) {
    return m(Layout, vnode.attrs, [
      m("h3", "HomePage.js Hello"),
      m("p", "This is HomePage"),
      m("br"),
      m(
        "p",
        m(
          "a[href=/errorPage]",
          {
            oncreate: m.route.link
          },
          "To ErrPage"
        )
      )
    ]);
  }
};
