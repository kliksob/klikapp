const m = require("mithril");
const Layout = require("../components/Layout");

module.exports = {
  oninit({ attrs }) {
    attrs.head.title("404 Page Not Found");
  },
  view(vnode) {
    return m(Layout, vnode.attrs, [
      m("h3", "404 Page Not Found"),
      m("p", "The Page You Requested Was Not Found"),
      m("br"),
      m(
        "p",
        m(
          "a[href=/]",
          {
            oncreate: m.route.link
          },
          "Back To the Home"
        )
      )
    ]);
  }
};
