/* eslint-env browser */

import { fabric } from "fabric";
import Config from "../Config.js";

class Line {

    static createLine(color){
        let line = new fabric.Line( [250, 125, 250, 175 ], {
            fill: color,
            stroke: color,
            strokeWidth: 5,
            selectable: true,
            evented: true,
            lockScalingX: true,
            id: Date.now().toString(),
          });
        line.setControlsVisibility({
            ml: false, 
            mr: false, 
            bl: false,
            br: false, 
            tl: false, 
            tr: false,
        });
        return line;
    }

}

export default Line;