/* eslint-env browser */

import { fabric } from "fabric";
import CanvasHandler from "./CanvasHandler.js";
import Config from "./Config.js";
import MainMenuHandler from "./MainMenuHandler.js";
import Roomstarter from "./Roomstarter.js";
import uiElements from "./uiElements.js";
import LiteratureHandler from "./Literature/LiteratureHandler.js";
import ChatHandler from "./Chat/ChatHandler.js";
import SocketClient from "./SocketClient.js";

var canvasHandler,
    roomstarter,
    mainMenuHandler,
    literatureHandler,
    chatHandler,
    socketClient;

function init() {
  createComponents();
}

function createComponents(){
  socketClient = new SocketClient();
  roomstarter = new Roomstarter();
  mainMenuHandler = new MainMenuHandler();
  literatureHandler = new LiteratureHandler();
  chatHandler = new ChatHandler("Valentin");
  roomstarter.start();
  mainMenuHandler.setListener();
  socketClient.start();
  socketClient.requestNewRoom();
  createCanvas();
}

function createCanvas(){
  let canvas = new fabric.Canvas("brainstorming-canvas", { 
    width: 3000 , 
    height: 3000,
    fireRightClick: true,
    stopContextMenu: true }),
    canvasHandler = new CanvasHandler(canvas);
  canvasHandler.addListener();
  /* Adds functionality to zoom-in and -out and pan the canvas by clicking and pressing the alt-key*/

  canvas.on("mouse:wheel", function(opt){
    var delta = opt.e.deltaY,
      zoom = canvas.getZoom();
      zoom *= Math.pow(Config.FACTOR_ZOOM_SPEED, delta);
    if (zoom > Config.MAX_ZOOM){ zoom = Config.MAX_ZOOM; }
    if (zoom < Config.MIN_ZOOM){ zoom = Config.MIN_ZOOM; }
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
  
  canvas.on("mouse:down", function(opt){
    var evt = opt.e;
    if (evt.altKey === true){
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
      uiElements.CANAVS.style.cursor = "grab";
    }
  });

  canvas.on("mouse:move", function(opt){
    var e = opt.e,
    vpt = this.viewportTransform;
    if (this.isDragging) {
      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  });

  canvas.on("mouse:up", function(){
    this.setViewportTransform(this.viewportTransform);
    this.isDragging = false;
    this.selection = true;
  });

}

init();
