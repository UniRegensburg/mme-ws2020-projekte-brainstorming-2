/* eslint-env browser */

import { fabric } from "fabric";
import { saveAs } from "file-saver";
import uiElements from "../uiElements.js";
import Config from "../Config.js";
import Observable, { Event } from "../Observable.js";
import Circle from "./Circle.js";
import Rect from "./Rect.js";
import Line from "./Line.js";
import Text from "./Text.js";
import Contextmenu from "./ContextMenu.js";
import CanvasUpdate from "./CanvasUpdate.js";

class CanvasHandler extends Observable{

    constructor (canvas){
        super();
        this.canvas = canvas;
        this.contextMenuActive = false;
        this.selectedObject = null;
        this.drawingmode = false;
        this.clipboard = null;
        this.pointerX = null;
        this.pointerY = null;
        this.colors = getComputedStyle(document.documentElement);
        this.contextMenu = new Contextmenu(canvas);
        this.activeColor = this.colors.getPropertyValue("--red");
    }

    addListener(){
        this.addFileUploadListener();
        this.addExportCanvasListener();
        this.setClickListener();
        this.setCanvasEventListener();
        this.contextMenu.setCanvasListener();
    }

    /* Setting Listener on UI-Elements */

    setClickListener(){
        uiElements.BTN_RECT.addEventListener("click", this.createRect.bind(this));
        uiElements.BTN_CIRCLE.addEventListener("click", this.createCircle.bind(this));
        uiElements.BTN_TEXT.addEventListener("click", this.createText.bind(this));
        uiElements.BTN_ARROW.addEventListener("click", this.createArrow.bind(this));
        uiElements.BTN_DRAW.addEventListener ("click", this.enableDrawing.bind(this));
        uiElements.BTN_NOTE.addEventListener("click", this.createNote.bind(this));
        this.setStrokeThicknessListener();
        for (let i = 0; i < uiElements.INPUT_COLORS.length ; i++) {
            uiElements.INPUT_COLORS[i].addEventListener("click", (event) => {
                let color = event.target.value;
                this.activeColor = this.colors.getPropertyValue(`--${color}`);
                this.changeColor();
            });
        }
    }

    setCanvasEventListener(){
        this.contextMenu.addEventListener("sendToBack", (event) => {
            this.notifyCanvasChange(event.data, "objectToBack");
        });
        this.contextMenu.addEventListener("bringToFront", (event) => {
            this.notifyCanvasChange(event.data, "objectToFront");
        });
        this.contextMenu.addEventListener("removed", (event) => {
            this.notifyCanvasChange(event.data, "removed");
        });
        this.contextMenu.addEventListener("added", (event) => {
            this.notifyCanvasChange(event.data, "added");
        });
        this.canvas.on("object:modified", (event) => {
            // eslint-disable-next-line no-underscore-dangle
            if(event.target._objects){
                // eslint-disable-next-line no-underscore-dangle
                event.target._objects.forEach(object => {
                    this.notifyCanvasChange(object.id, "modified");
                });
            } else {
                this.notifyCanvasChange(event.target.id, "modified");
            }
        });
        this.canvas.on("path:created", (event) => {
            let object = event.path,
                newID = Date.now().toString();
            object["id"] = newID;
            this.canvas.renderAll();
            this.notifyCanvasChange(newID, "added");
        });
    }

    updateCanvas(payload){
        let changes = payload.update,
            update = new CanvasUpdate(changes.type, changes.objectID, changes.canvasObject);
        update.executeChange(this.canvas);

        /*this.canvas.loadFromJSON(canvasObject, this.canvas.renderAll.bind(this.canvas) console.log(this.canvas), function(jsonObject, fabricObject) {
            console.log(fabricObject);
        });*/
    }

    notifyCanvasChange(id, type){
        let json = this.canvas.toObject(["id"]),
            update = new CanvasUpdate(type, id, json),
            payload = {json, update},
            event = new Event("CanvasContentChanged", payload);
        this.notifyAll(event);
        
        /*
        let json = this.canvas.toObject(["id"]),
            payload = {json, id},
            event = new Event("CanvasContentChanged", payload);
        this.notifyAll(event);*/
    }

    /* Creates a Circle and adds it to canvas */

    createCircle(){
        let circle = Circle.createCircle(this.activeColor);
        this.canvas.add(circle);
        this.notifyCanvasChange(circle.id, "added");
    }

    /* Creates a Rectangle and adds it to canvas */

    createRect(){
        let rect = Rect.createRect(this.activeColor);
        this.canvas.add(rect);
        this.notifyCanvasChange(rect.id, "added");
    }

    /* Creates an Arrow and adds it to canvas */

    createArrow(){
        let line = Line.createLine(this.activeColor);
        this.canvas.add(line);
        this.notifyCanvasChange(line.id, "added");
    }

    /* Creates a Sticky-Note and adds it to canvas */

    createNote(){
        let note = Text.createNote(this.activeColor);
        this.canvas.add(note);
        this.notifyCanvasChange(note.id, "added");
    }

    /* Creates a Textbox and adds it to canvas */

    createText(){
        let text = Text.createText(this.activeColor);
        this.canvas.add(text);
        this.notifyCanvasChange(text.id, "added");
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
            this.canvas.freeDrawingBrush.width = parseInt(input.value, 10) || 1;
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
            if(file.size < Config.MAX_FILESIZE_IMAGE){
                reader.readAsDataURL(file);
            }else{
                alert(Config.ALERT_MAX_FILESIZE);
            }
            reader.addEventListener("load", () => {
                fabric.Image.fromURL(reader.result, (image) => {
                    let newID = Date.now().toString();
                    image.scale(Config.IMAGESCALE_IMPORT).set("flipX", false);
                    image["id"] = newID;
                    this.canvas.add(image);
                    this.canvas.renderAll();
                    this.notifyCanvasChange(newID, "added");
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
        if(activeObjects){
            for (let index = 0; index < activeObjects.length; index++) {
                let object = activeObjects[index];
                object.set("fill", this.activeColor);
                if(object.stroke){
                    object.set("stroke", this.activeColor);
                    object.set("fill", null);
                }
                this.notifyCanvasChange(object.id, "modified");
            }
        }
        this.canvas.freeDrawingBrush.color = this.activeColor;
        this.canvas.renderAll(); 
    }

}

export default CanvasHandler;
