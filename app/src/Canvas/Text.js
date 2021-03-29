/* eslint-env browser */

import { fabric } from "fabric";
import Config from "../Config.js";

class Text {

    static createText(color){
        let text = new fabric.Textbox("Text",{ 
            left: Config.OBJECT_DEFAULT_X, 
            top: Config.OBJECT_DEFAULT_Y,
            fill: color, 
            id : Date.now().toString(),
            });
        return text;
    }

    static createNote(color){
        let note = new fabric.Textbox("Sticky Note",{ 
            left: Config.OBJECT_DEFAULT_X, 
            top: Config.OBJECT_DEFAULT_Y,
            backgroundColor: color,
            fill: "black", 
            id: Date.now().toString(),
            });
        return note;
    }

}

export default Text;