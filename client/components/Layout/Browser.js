const m = require("mithril");
const Navbar = require("../Navbar");

module.exports = {
  oncreate({ attrs }) {
    //console.log(Navbar);
    window.scrollTo(0, 0);
    const title = attrs.head.title.map(val => {
      return val + " | KlikApp FW";
    });
    document.title = title();
  },
  view(vnode) {
    return [
      m("header.header", m(Navbar)),
      m("main.container", vnode.children),
      m("footer.footer", [
        m(".copy", {}, "@" + new Date().getFullYear() + " KlikApp")
      ])
    ];
  }
};
