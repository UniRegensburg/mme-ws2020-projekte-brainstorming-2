/* eslint-env browser */

import { fabric } from "fabric";
import Config from "../Config.js";

class Rect {

    static createRect(color){
        let rect = new fabric.Rect({
            id: Date.now().toString(),
            left: 100,
            top: 100,
            fill: color,
            width: Config.OBJECT_DEFAULT_WIDTH,
            height: Config.OBJECT_DEFAULT_HEIGHT,
            });
        return rect;
    }

}

export default Rect;