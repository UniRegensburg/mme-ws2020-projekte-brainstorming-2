/* eslint-env node */
//require("reflect-metadata");
const AppServer = require("./server/dist/AppServer.js");

var server;

/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
  // Access command line parameters from start command (see package.json)
  let appDirectory = process.argv[2], // folder with client files
    appPort = process.argv[3]; // port to use for serving static files
  server = new AppServer(appDirectory);
  server.start(appPort);
}

init();
