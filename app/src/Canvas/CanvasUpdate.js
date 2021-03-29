/* eslint-env browser */

import { fabric } from "fabric";

class CanvasUpdate {

    constructor(type, objectID, canvasObject){
        this.type = type;
        this.objectID = objectID;
        this.canvasObject = canvasObject;
    }

    executeChange(canvas){
        let newObject = null;
        fabric.util.enlivenObjects(this.canvasObject.objects, (objects) => {
            objects.forEach( object => {
                if(object.id === this.objectID){
                    newObject = object;
                    if(this.type === "added"){
                        canvas.add(newObject);
                        canvas.renderAll();
                    }else if (this.type === "modified") {
                        canvas.getObjects().forEach( object => {
                            if (object.id === this.objectID && newObject !== null) {
                                let newProperties = {
                                    height: newObject.height,
                                    width: newObject.width,
                                    scaleX: newObject.scaleX,
                                    scaleY: newObject.scaleY,
                                    fill: newObject.fill,
                                    flipX: newObject.flipX,
                                    flipY: newObject.flipY,
                                    left: newObject.left,
                                    top: newObject.top,
                                    angle: newObject.angle,
                                    radius: newObject.radius,
                                    text: newObject.text,
                                    stroke: newObject.stroke,
                                };  
                                object.setOptions(newProperties);
                                canvas.renderAll();
                                return; 
                            }
                        });
                    }
                }
            });
        });

        if (this.type === "removed") {
            canvas.getObjects().forEach( object => {
                if (object.id === this.objectID) {
                    canvas.remove(object);
                    canvas.renderAll();
                    return; 
                }
            });
        } else if (this.type === "objectToFront"){
            canvas.getObjects().forEach( object => {
                if (object.id === this.objectID) {
                    canvas.bringToFront(object);
                    canvas.renderAll();
                    return; 
                }
            });
        } else if (this.type === "objectToBack"){
            canvas.getObjects().forEach( object => {
                if (object.id === this.objectID) {
                    canvas.sendToBack(object);
                    canvas.renderAll();
                    return; 
                }
            });
        }
    }

}

export default CanvasUpdate;