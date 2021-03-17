/* eslint-env node */
import("reflect-metadata");
require("dotenv").config();

import express, { Application } from "express";
import { Server as SocketServer } from "socket.io";
import { Server } from "http";
import path from "path";
import io from "./socket/SocketServer";
import Logger, { Log } from "./util/logger";

import { createConnection, Connection } from "typeorm";
import { Room } from "./models/room";
import { Literature } from "./models/literature";

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
  private db: Connection | undefined;
  private logger = new Log("SERVER");
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

    createConnection({
      type: "sqlite",
      database: "./db.sql",
      name: "default",
      entities: [Room, Literature],
      logging: false,
      synchronize: true,
    })
      .then((con) => {
        this.logger.info("Connected to database");
        this.db = con;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }

  /**
   * Starts server on given port
   *
   * @param  {Number} port Port to use for serving static files
   */
  start(port: number) {
    this.server = this.app.listen(port);

    this.ws = io.attach(this.server);
    this.logger.info(
      `AppServer started. Client available at http://localhost:${port}/app`
    );
  }

  /**
   * Stops running express server
   */
  stop() {
    if (this.server) this.server.close();
    if (this.ws) this.ws.close();
    if (this.db) this.db.close();
  }
}

module.exports = AppServer;
