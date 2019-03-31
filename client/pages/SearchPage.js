const m = require("mithril");
const Layout = require("../components/Layout");

module.exports = {
  oninit({ attrs }) {
    attrs.head.title("Search");
  },
  view(vnode) {
    return m(Layout, vnode.attrs, [
      m("h3", "Search Page"),
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
