const m = require("mithril");
const stream = require("mithril/stream");
const routes = require("./routes.js");
const states = require("./states.js");

const routing = {};
const sharedState = stream();

const setSharedState = params => {
  if (process.browser) {
    sharedState(window.__initialState ? window.__initialState : {});
    //delete window.__initialState;
  } else {
    sharedState(params.sharedState ? params.sharedState : {});
    //delete params.sharedState;
  }
};

Object.keys(routes).forEach(k => {
  routing[k] = {
    onmatch(params, path) {
      setSharedState(params);
      return routes[k].onmatch ? routes[k].onmatch(params, path) : routes[k];
    },
    render(vnode) {
      Object.assign(vnode.attrs, states, {
        sharedState
      });
      Object.seal(vnode.attrs);
      return vnode;
    }
  };
});

if (process.browser) {
  require("./styles/index.scss");
  m.route.prefix("");
  m.route(document.querySelector("#root"), "/", routing);
} else {
  //console.log(process.env.NODE_ENV);
  module.exports = routing;
}
