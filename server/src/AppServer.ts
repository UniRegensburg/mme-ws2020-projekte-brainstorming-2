/* eslint-env node */
require("dotenv").config();

import express, { Application } from "express";
import { Server as SocketServer } from "socket.io";
import { Server } from "http";
import path from "path";

import io from "./socket/SocketServer";
import mongoose from "mongoose";

/**
 * AppServer
 *
 * Creates a simple web server by using express to static serve files from a given directory.
 *
 * @author: Alexander Bazo
 * @version: 1.0
 */

class AppServer {
  private appDir: string;
  private app: Application;
  private server: Server | undefined = undefined;
  private ws: SocketServer | undefined;
  /**
   * Creates full path to given appDir and constructors express application with
   * static "/app" route to serve files from app directory.
   *
   * @constructor
   * @param  {String} appDir Relative path to application dir (from parent)
   */
  constructor(appDir: string) {
    this.appDir = path.join(__dirname, "../../", appDir);
    this.app = express();
    this.app.use("/app", express.static(this.appDir));

    mongoose.connect(
      process.env.MONGO_URI as string,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  }

  /**
   * Starts server on given port
   *
   * @param  {Number} port Port to use for serving static files
   */
  start(port: number) {
    this.server = this.app.listen(port, function () {
      console.log(
        `AppServer started. Client available at http://localhost:${port}/app`
      );
    });

    this.ws = io.attach(this.server);
  }

  /**
   * Stops running express server
   */
  stop() {
    if (this.server) this.server.close();
    if (this.ws) this.ws.close();
  }
}

module.exports = AppServer;
