"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  require("./server/index.js")(req, res, next);
});

if(process.env !== 'production') {
  const watcher = require("chokidar").watch(["./client", "./server"]);
  watcher.on("ready", () => {
    watcher.on("all", () => {
      //console.log("Clearing App Cache...");
      Object.keys(require.cache).forEach(id => {
        if ( (/[\/\\]client[\/\\]/.test(id)) || (/[\/\\]server[\/\\]/.test(id)) ) delete require.cache[id];
      });
    });
  });
}
app.listen(port, () => {
  console.log("App now is listen to PORT " + port);
});