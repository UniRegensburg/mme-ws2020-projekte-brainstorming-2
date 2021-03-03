/* eslint-env browser */

import { fabric } from "fabric";
import { saveAs } from "file-saver";
import uiElements from "./uiElements.js";
import Config from "./Config.js";

class CanvasHandler {

    constructor (canvas){
        this.canvas = canvas;
        this.contextMenuActive = false;
        this.selectedObject = null;
        this.colors = getComputedStyle(document.documentElement);
        this.activeColor = this.colors.getPropertyValue("--red");
    }

    addListener(){
        this.addFileUploadListener();
        this.addExportCanvasListener();
        this.addContextButtonListeners();
        uiElements.BTN_RECT.addEventListener("click", this.createRect.bind(this));
        uiElements.BTN_TEXT.addEventListener("click", this.createText.bind(this));
        let colorInputList = uiElements.INPUT_COLORS;
        for (let i = 0; i < colorInputList.length ; i++) {
            colorInputList[i].addEventListener("click", (event) => {
                let color = event.target.value;
                this.activeColor = this.colors.getPropertyValue(`--${color}`);
            });
        }
    }

    /* Creates a Rectangle and adds it to canvas */

    createRect(){
        let rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: this.activeColor,
            width: Config.OBJECT_DEFAULT_WIDTH,
            height: Config.OBJECT_DEFAULT_HEIGHT,
            });
        this.addContextmenuListener(rect);
        this.canvas.add(rect);
    }

    /* Creates a Textbox and adds it to canvas */

    createText(){
        let text = new fabric.IText("Text",{ 
            left: 100, 
            top: 100,
            fill: this.activeColor, 
            });
        this.addContextmenuListener(text);
        this.canvas.add(text);
    }

    /* Create Contextmenu, when right-clicking on a Canvas-Object */

    addContextmenuListener(object){
        object.on("mousedown", (event) =>{
            if(event.button === Config.KEY_RIGHT_MOUSEBUTTON){
                let menu = uiElements.CONTEXTMENU;
                this.selectedObject = this.canvas.findTarget(event.e);
                menu.style.left = `${event.e.clientX}px`;
                menu.style.top = `${event.e.clientY}px`;
                menu.style.display = "block";
                this.contextMenuActive = true;
            }
        });
        window.addEventListener("click", () => {
            if(this.contextMenuActive){
                let menu = uiElements.CONTEXTMENU;
                menu.style.display = "none";
            }
        });
    }

    /* Adds Listeners to each Button of the Contextmenu */

    addContextButtonListeners(){
        let contextDelete = uiElements.CONTEXTMENU.querySelector("#context-delete"),
            contextToTop = uiElements.CONTEXTMENU.querySelector("#context-to-top"),
            contextToBottom = uiElements.CONTEXTMENU.querySelector("#context-to-bottom"),
            thisinstance = this;
        contextDelete.addEventListener("click", this.deleteObject.bind(thisinstance));
        contextToTop.addEventListener("click", () => {
            this.canvas.bringToFront(this.selectedObject);
        });
        contextToBottom.addEventListener("click", () => {
            this.canvas.sendToBack(this.selectedObject);
        });
    }

    /* Adds function to upload an image and bring in to the canvas by clicking on the Image-Upload-Button */

    addFileUploadListener(){
        uiElements.BTN_IMAGE.addEventListener("click", () => {
            uiElements.IMAGE_UPLOAD.click();
        });
        uiElements.IMAGE_UPLOAD.addEventListener("change", () => {
            let reader = new FileReader(),
                file = uiElements.IMAGE_UPLOAD.files[0];
            if(file){
                reader.readAsDataURL(file);
            }
            reader.addEventListener("load", () => {
                fabric.Image.fromURL(reader.result, (image) => {
                    image.scale(Config.IMAGESCALE_IMPORT).set("flipX", true);
                    this.canvas.add(image);
                    this.addContextmenuListener(image);
                });
            });
        });
    }

    /* Adds function to export the canavas as an .png-file by clicking on the Export-Button */

    addExportCanvasListener(){
        uiElements.BTN_EXPORT.addEventListener("click", () => {
            uiElements.CANAVS.toBlob(function(blob){
                saveAs(blob, "image.png");
            });
        });
    }

    /* removes selected object from canvas */

    deleteObject(){
        this.canvas.remove(this.selectedObject);
    }

}

export default CanvasHandler;
