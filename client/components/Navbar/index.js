const m = require("mithril");
const NavbarItem = require("./NavbarItem");
const NavbarSearch = require("./NavbarSearch");
const $ = require("./../../lib/zepto");
module.exports = {
  toggle() {
    const $this = this;
    const $self = $($this.dom);
    const $burger = $self.find(".navbar-burger");
    const $menu = $self.find(".navbar-menu");
    if ($burger.hasClass("is-active")) {
      $burger.removeClass("is-active");
      $menu.next().animate({
        opacity: 0
      });
      $menu.animate("slideOutLeft", {
        easing: "ease-out",
        complete() {
          $menu.removeClass("is-active");
          $menu.next().remove();
        }
      });
    } else {
      $burger.addClass("is-active");
      $menu
        .after($("<div />"))
        .next()
        .css({
          position: "fixed",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          width: "100%",
          height: "100%",
          opacity: 0
        })
        .animate({
          opacity: 1
        });
      $menu.next().click($this.state.toggle.bind($this));
      $menu.addClass("is-active").animate("slideInLeft", {
        easing: "ease-in"
      });
    }
  },
  view(vnode) {
    return m(
      "nav.navbar.is-primary.has-shadow#top-navbar",
      m(".container", [
        m(".navbar-brand", [
          m(
            NavbarItem,
            {
              href: "/",
              oncreate: m.route.link
            },
            "KlikApp"
          ),
          m(
            ".navbar-burger",
            {
              onclick: vnode.state.toggle.bind(vnode)
            },
            [0, 1, 2].map(() => m("span[aria-hidden=true]"))
          )
        ]),
        m(".navbar-menu", [
          m(
            ".navbar-start",
            m(
              ".navbar-item",
              m(NavbarSearch, {
                onSubmit: function() {
                  console.log("Search Form Submited..");
                }
              })
            )
          ),
          m(
            ".navbar-end",
            [0, 1, 2, 3, 4, 5, 6].map(k => {
              return m(
                NavbarItem,
                {
                  href: "/navbar-start-item-" + k,
                  oncreate: m.route.link
                },
                "Menu " + k
              );
            })
          )
        ])
      ])
    );
  }
};
