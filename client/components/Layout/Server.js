const m = require("mithril");
const BrowserLayout = require("./Browser");

const Head = {
  view(vnode) {
    const { head } = vnode.attrs;
    const title = head.title.map(val => {
      return val + " | KlikApp FW";
    });
    return m("head", [
      m("meta[charset=utf-8]"),
      m("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, minimum-scale=1.0"
      }),
      m("title", title() || "KlikApp"),
      m("meta", {
        name: "description",
        content: head.description()
      }),
      m("link[rel=stylesheet][type=text/css]", {
        href: "/assets/client.css"
      })
    ]);
  }
};

const Body = {
  view(vnode) {
    return m("body", [
      m("div#root", m(BrowserLayout, vnode.attrs, vnode.children)),
      /*m("script", {
        type: "text/javascript",
        src: "/vendor/vconsole.min.js"
      }),
      m("script", `window.vConsole = new VConsole()`),*/
      m(
        "script",
        `window.__initialState = ${JSON.stringify(vnode.attrs.sharedState)}`
      ),
      m("script", {
        type: "text/javascript",
        src: "/assets/client.js"
      })
    ]);
  }
};

module.exports = {
  view(vnode) {
    return [
      m("!DOCTYPE[html]"),
      m("html[lang=en]", [
        m(Head, vnode.attrs, null),
        m(Body, vnode.attrs, vnode.children)
      ])
    ];
  }
};
