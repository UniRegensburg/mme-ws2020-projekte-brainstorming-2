import { fabric } from "fabric";
import { saveAs } from "file-saver";
import { isObjectBindingPattern } from "typescript";
import { Observable, Event } from "./Observable.js";
import uiElements from "./uiElements.js";

class CanvasHandler extends Observable{

    constructor (canvas){
        super();
        this.canvas = canvas;
        this.contextMenuActive = false;
        this.selectedObject = null;
        this.colors = getComputedStyle(document.documentElement);
        this.activeColor = this.colors.getPropertyValue("--red");
        this.addContextButtonListeners();
        this.addListener();
    }

    addListener(){
        this.addFileUploadListener();
        this.addExportCanvasListener();
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

    createRect(){
        let rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: this.activeColor,
            width: 100,
            height: 100,
            });
        this.addContextmenuListener(rect);
        this.canvas.add(rect);
    }

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
        object.on('mousedown', (event) =>{
            if(event.button === 3){
                let menu = uiElements.CONTEXTMENU;
                    //pointer = this.canvas.getPointer(event.e, true);
                console.log(this.canvas.findTarget(event.e));
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

    addContextButtonListeners(){
        let contextDelete = uiElements.CONTEXTMENU.querySelector("#context-delete"),
            contextToTop = uiElements.CONTEXTMENU.querySelector("#context-to-top"),
            contextToBottom = uiElements.CONTEXTMENU.querySelector("#context-to-bottom");
        let thisinstance = this;
        contextDelete.addEventListener("click", this.deleteObject.bind(thisinstance));
        contextToTop.addEventListener("click", () => {
            this.canvas.bringToFront(this.selectedObject);
        });
        contextToBottom.addEventListener("click", () => {
            this.canvas.sendToBack(this.selectedObject);
        });
    }

    addFileUploadListener(){
        uiElements.BTN_IMAGE.addEventListener("click", () => {
            uiElements.IMAGE_UPLOAD.click();
        });
        uiElements.IMAGE_UPLOAD.addEventListener("change", (event) => {
            let reader = new FileReader(),
                file = uiElements.IMAGE_UPLOAD.files[0];
            if(file){
                reader.readAsDataURL(file);
            }
            reader.addEventListener("load", () => {
                fabric.Image.fromURL(reader.result, (image) => {
                    image.scale(0.5).set('flipX', true);
                    this.canvas.add(image);
                    this.addContextmenuListener(image);
                });
            });
        });
    }

    addExportCanvasListener(){
        uiElements.BTN_EXPORT.addEventListener("click", () => {
            uiElements.CANAVS.toBlob(function(blob){
                saveAs(blob, "image.png");
            });
        });
    }

    deleteObject(){
        this.canvas.remove(this.selectedObject);
        
    }

}

export default CanvasHandler;
