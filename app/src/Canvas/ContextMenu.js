/* eslint-env browser */

import { fabric } from "fabric";
import uiElements from "../uiElements.js";
import Config from "../Config.js";
import Observable, { Event } from "../Observable.js";

class Contextmenu extends Observable{

    constructor(canvas){
        super();
        this.canvas = canvas;
        this.contextMenuActive = false;
        this.selectedObject = null;
        this.drawingmode = false;
        this.clipboard = null;
        this.addContextButtonListeners();
    }

    /* Create Contextmenu, when right-clicking on a Canvas*/

    setCanvasListener(){
        this.canvas.on("mouse:down", (event) => {
            if(event.button === Config.KEY_RIGHT_MOUSEBUTTON){
                let x = `${event.e.clientX}px`,
                    y = `${event.e.clientY}px`;
                this.pointerX = event.e.layerX; 
                this.pointerY = event.e.layerY; 
                if(event.target !== null){
                        let menu = uiElements.CONTEXTMENU;
                        this.switchContextMenu("onObject");
                        this.selectedObject = this.canvas.getActiveObject();
                        menu.style.left = x;
                        menu.style.top = y;
                        menu.style.display = "block";
                        this.contextMenuActive = true;
                } else {
                    let menu = uiElements.CONTEXTMENU;
                    this.switchContextMenu("notOnObject");
                    menu.style.left = x;
                    menu.style.top = y;
                    menu.style.display = "block";
                    this.contextMenuActive = true;
                }
            }
        });
        window.addEventListener("click", () => {
            if(this.contextMenuActive){
                let menu = uiElements.CONTEXTMENU;
                menu.style.display = "none";
            }
        });
    }

    /* Switch Style of Contextmenu when clicking on Object or not */

    switchContextMenu(type){
        if (type === "notOnObject") {
            uiElements.CONTEXTMENU.querySelector("#context-delete").style = "display: none";
            uiElements.CONTEXTMENU.querySelector("#context-to-top").style = "display: none";
            uiElements.CONTEXTMENU.querySelector("#context-to-bottom").style = "display: none";
            uiElements.CONTEXTMENU.querySelector("#context-copy").style = "display: none";
        } else {
            uiElements.CONTEXTMENU.querySelector("#context-delete").style = "display: block";
            uiElements.CONTEXTMENU.querySelector("#context-to-top").style = "display: block";
            uiElements.CONTEXTMENU.querySelector("#context-to-bottom").style = "display: block";
            uiElements.CONTEXTMENU.querySelector("#context-copy").style = "display: block";
        }
    }

    /* Adds Listeners to each Button of the Contextmenu */

    addContextButtonListeners(){
        let contextDelete = uiElements.CONTEXTMENU.querySelector("#context-delete"),
            contextToTop = uiElements.CONTEXTMENU.querySelector("#context-to-top"),
            contextToBottom = uiElements.CONTEXTMENU.querySelector("#context-to-bottom"),
            contextCopy = uiElements.CONTEXTMENU.querySelector("#context-copy"),
            contextPaste = uiElements.CONTEXTMENU.querySelector("#context-paste"),
            thisinstance = this;
        contextDelete.addEventListener("click", this.deleteObject.bind(thisinstance));
        contextToTop.addEventListener("click", () => {
            this.canvas.bringToFront(this.selectedObject);
            let ev = new Event("bringToFront", this.selectedObject.id);
            this.notifyAll(ev);
        });

        contextToBottom.addEventListener("click", () => {
            this.canvas.sendToBack(this.selectedObject);
            let ev = new Event("sendToBack", this.selectedObject.id);
            this.notifyAll(ev);
        });

        /* Copy-Paste of Objects (like in Fabric-Documentation: http://fabricjs.com/copypaste) */

        contextCopy.addEventListener("click", () => {
            if(this.selectedObject){
                this.selectedObject.clone( (cloned) => {
                    this.clipboard = cloned;
                });
            }
        });
        contextPaste.addEventListener("click", () => {
            if (this.clipboard){
                this.clipboard.clone( (clonedObject) => {
                    this.canvas.discardActiveObject();
                    clonedObject.set({
                        left: this.pointerX,
                        top: this.pointerY,
                        evented: true,
                    });
                    if (clonedObject.type === "activeSelection" ) {
                        clonedObject.canvas = this.canvas;
                        clonedObject.forEachObject( (object) => {
                            let newID = Date.now().toString(),
                                ev = new Event("added", newID);
                            object["id"] = newID;
                            this.canvas.add(object);
                            this.notifyAll(ev);
                        });
                    } else {
                        let newID = Date.now().toString(),
                                ev = new Event("added", newID);
                            clonedObject["id"] = newID;
                        this.canvas.add(clonedObject);
                        this.notifyAll(ev);
                    }
                    this.canvas.setActiveObject(clonedObject);
                    this.canvas.requestRenderAll();
                });
            }
        });
    }

    /* Delete an Object from Canvas */

    deleteObject(){
        let selected = this.canvas.getActiveObjects(),
            selectedGroup = new fabric.ActiveSelection(selected, {
            canvas: this.canvas,
            });
        selectedGroup.forEachObject( (obj) => {
            this.canvas.remove(obj);
            let ev = new Event("removed", obj.id);
            this.notifyAll(ev);
        });
        this.canvas.discardActiveObject().renderAll();
    }

}

export default Contextmenu;