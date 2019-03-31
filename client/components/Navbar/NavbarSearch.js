const m = require("mithril");
const $ = require("./../../lib/zepto");

module.exports = {
  view(vnode) {
    const onSubmit = $.isFunction(vnode.attrs.onSubmit)
      ? vnode.attrs.onSubmit
      : () => {};
    return m(
      "form.field.has-addons",
      {
        method: "GET",
        action: "/search",
        onsubmit: function(e) {
          e.preventDefault();
          onSubmit(arguments);
        }
      },
      [
        m(".control", [
          m("input.input", {
            type: "search",
            value: "",
            name: "search",
            placeholder: "search...."
          })
        ]),
        m(".control", [m("button.button.is-danger", "Search")])
      ]
    );
  }
};
