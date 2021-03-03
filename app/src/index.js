/* eslint-env browser */

import {fabric} from 'fabric';
import CanvasHandler from './CanvasHandler.js';

function init() {
  console.log("It works");
  let canvas = new fabric.Canvas('brainstorming-canvas', { 
    width: 3000 , 
    height: 3000,
    fireRightClick: true,
    stopContextMenu: true }),
    canvasHandler = new CanvasHandler(canvas);
  canvasHandler.addEventListener("rectCreated", (e) =>{
    canvas.add(e.data);
  });
  canvasHandler.addEventListener("textCreated", (e) =>{
    canvas.add(e.data);
  });
  canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.95 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
  

canvas.on('mouse:down', function(opt) {
  var evt = opt.e;
  if (evt.altKey === true){
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  }
});
canvas.on('mouse:move', function(opt) {
  if (this.isDragging) {
    var e = opt.e;
    var vpt = this.viewportTransform;
    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
});
canvas.on('mouse:up', function(opt) {
  // on mouse up we want to recalculate new interaction
  // for all objects, so we call setViewportTransform
  this.setViewportTransform(this.viewportTransform);
  this.isDragging = false;
  this.selection = true;
});

/*var menu = document.getElementById("contextmenu");

window.addEventListener("contextmenu" , e => {
  e.preventDefault();
  console.log(e.target);
  menu.style.left = `${e.pageX}px`;
  menu.style.top = `${e.pageY}px`;
  menu.style.display = "block";
})
    */
}

init();
