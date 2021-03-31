/* eslint-env browser */

import { fabric } from "fabric";
import Config from "../Config.js";

class Circle {

    static createCircle(color){
        let circle = new fabric.Circle({
            radius: Config.OBJECT_DEFAULT_RADIUS,
            left: Config.OBJECT_DEFAULT_X,
            top: Config.OBJECT_DEFAULT_Y,
            fill: color,
            id : Date.now().toString(),
            });
        return circle;
    }

}

export default Circle;