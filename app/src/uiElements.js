/* eslint-env browser */

const uiElements = {
    CANAVS : document.getElementById("brainstorming-canvas"),
    // Canvas-Tools
    BTN_RECT : document.querySelector(".tool.square"),
    BTN_ARROW : document.querySelector(".tool.arrow"),
    BTN_TEXT: document.querySelector(".tool.text"),
    BTN_DRAW: document.querySelector(".tool.draw"),
    BTN_IMAGE : document.querySelector(".tool.image"),
    BTN_EXPORT : document.querySelector(".tool.export"),
    INPUT_COLORS : document.getElementsByName("color"),
    CONTEXTMENU : document.getElementById("contextmenu"),
    IMAGE_UPLOAD : document.getElementById("image-upload"),
    
};

export default uiElements;