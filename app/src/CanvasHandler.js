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
        this.drawingmode = false;
        this.colors = getComputedStyle(document.documentElement);
        this.activeColor = this.colors.getPropertyValue("--red");
    }

    addListener(){
        this.addFileUploadListener();
        this.addExportCanvasListener();
        this.addContextButtonListeners();
        this.setContextMenuListener();
        this.setStrokeThicknessListener();
        uiElements.BTN_RECT.addEventListener("click", this.createRect.bind(this));
        uiElements.BTN_CIRCLE.addEventListener("click", this.createCircle.bind(this));
        uiElements.BTN_TEXT.addEventListener("click", this.createText.bind(this));
        uiElements.BTN_ARROW.addEventListener("click", this.createArrow.bind(this));
        uiElements.BTN_DRAW.addEventListener ("click", this.enableDrawing.bind(this));
        uiElements.BTN_NOTE.addEventListener("click", this.createNote.bind(this));
        let colorInputList = uiElements.INPUT_COLORS;
        for (let i = 0; i < colorInputList.length ; i++) {
            colorInputList[i].addEventListener("click", (event) => {
                let color = event.target.value;
                this.activeColor = this.colors.getPropertyValue(`--${color}`);
                this.changeColor();
            });
        }
    }

    /* Creates a Circle and adds it to canvas */

    createCircle(){
        let circle = new fabric.Circle({
            radius: Config.OBJECT_DEFAULT_RADIUS,
            left: 100,
            top: 100,
            fill: this.activeColor,
            });
        this.canvas.add(circle);
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
        this.canvas.add(rect);
    }

    /* Creates an Arrow and adds it to canvas */

    createArrow(){
        let line = new fabric.Line( [250, 125, 250, 175 ], {
            fill: this.activeColor,
            stroke: this.activeColor,
            strokeWidth: 5,
            selectable: true,
            evented: true,
            lockScalingX: true,
          });
        line.setControlsVisibility({
            ml: false, 
            mr: false, 
            bl: false,
            br: false, 
            tl: false, 
            tr: false,
        });
        this.canvas.add(line);
    }

    /* Creates a Sticky-Note and adds it to canvas */

    createNote(){
        let note = new fabric.Textbox("Sticky Note",{ 
            left: 100, 
            top: 100,
            backgroundColor: this.activeColor,
            padding: 20,
            fill: "black", 
            });
        this.canvas.add(note);
    }

    /* Creates a Textbox and adds it to canvas */

    createText(){
        let text = new fabric.IText("Text",{ 
            left: 100, 
            top: 100,
            fill: this.activeColor, 
            });
        this.canvas.add(text);
    }

    /* Activates Drawingmode an sets Context menu to ne Path-Objects */

    enableDrawing(){
        this.drawingmode = !this.drawingmode;
        if(this.drawingmode === true){
            uiElements.BTN_DRAW.classList.add("active");
        }else{
            uiElements.BTN_DRAW.classList.remove("active");
        }
        this.canvas.freeDrawingBrush.color = this.activeColor;
        this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    }

    /* Create Contextmenu, when right-clicking on a Canvas-Object */

    addContextmenuListener(object){
        object.on("mousedown", (event) =>{
            if(event.button === Config.KEY_RIGHT_MOUSEBUTTON){
                let menu = uiElements.CONTEXTMENU;
                this.selectedObject = this.canvas.getActiveObject();
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

    setContextMenuListener(){
        this.canvas.on("mouse:down", (event) => {
            if(event.target !== null){
                if(event.button === Config.KEY_RIGHT_MOUSEBUTTON){
                    let menu = uiElements.CONTEXTMENU;
                    this.selectedObject = this.canvas.getActiveObject();
                    menu.style.left = `${event.e.clientX}px`;
                    menu.style.top = `${event.e.clientY}px`;
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

    /* Sets Listener on Input-Slider for Stroke-thickness of pencil */

    setStrokeThicknessListener(){
        let input = uiElements.INPUT_STROKE;
        uiElements.TOOL_WITH_TOOLTIP.addEventListener("mouseover", () => {
            uiElements.TOOLTIP_DRAW.style = "display: flex";
        });
        uiElements.TOOL_WITH_TOOLTIP.addEventListener("mouseout", () => {
            uiElements.TOOLTIP_DRAW.style = "display: none";
        });
        input.addEventListener("input", () => {
            uiElements.STROKE_THICKNESS_VALUE.innerHTML = input.value;
            this.canvas.freeDrawingBrush.width = input.value;
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

    /* change color of selcted objects */

    changeColor(){
        let activeObjects = this.canvas.getActiveObjects();
        for (let index = 0; index < activeObjects.length; index++) {
            let object = activeObjects[index];
            object.set("fill", this.activeColor);
            if(object.stroke !== null){
                object.set("stroke", this.activeColor);
            }
        }
        this.canvas.freeDrawingBrush.color = this.activeColor;
        this.canvas.renderAll(); 
    }

    /* removes selected object from canvas */

    deleteObject(){
        let selected = this.canvas.getActiveObjects(),
            selectedGroup = new fabric.ActiveSelection(selected, {
            canvas: this.canvas,
            });
        selectedGroup.forEachObject( (obj) => {
            this.canvas.remove(obj);
        });
        this.canvas.discardActiveObject().renderAll();
    }

}

export default CanvasHandler;
