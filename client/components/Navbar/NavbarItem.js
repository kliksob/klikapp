const m = require("mithril");

module.exports = {
  view(vnode) {
    const SemanticLinks = vnode.attrs.href ? "a.navbar-item" : ".navbar-item";
    return m(SemanticLinks, vnode.attrs, vnode.children);
  }
};
