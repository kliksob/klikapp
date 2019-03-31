const m = require('mithril');
const port = process.env.PORT || 3000;
const localUrl = window.location.protocol + '//' + (process.browser ? window.location.host : '127.0.0.1:' + port);


const request = options => {
  const args = Object.assign({}, options, {
    extract: xhr => {
      const isJSON =
        xhr.getResponseHeader('Content-Type').indexOf('application/json') !==
        -1;
      if (xhr.status >= 400) {
        throw new Object({
          status: xhr.status,
          message: xhr.statusText
        });
      } else {
        return isJSON ? JSON.parse(xhr.responseText) : xhr.responseText;
      }
    }
  });
  return m.request(args).catch(err => Promise.reject(err));
};

module.exports = {
  localUrl,
  request,
  get: (url, args) => {
    let options = {};
    options.method = 'GET';
    options.url = url;
    if (args && typeof args === 'object') {
      options = Object.assign(options, args);
    }

    return request(options);
  },

  post: (url, data, args) => {
    let options = {};
    options.method = 'POST';
    options.url = url;
    options.data = data;
    if (args && typeof args === 'object') {
      Object.assign(options, args);
    }

    return request(options);
  }
};