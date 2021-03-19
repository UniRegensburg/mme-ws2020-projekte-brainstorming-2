/* eslint-env browser */

import { createDocumentRegistry } from "typescript";
import uiElements from "./uiElements.js";

class Roomstarter {

    constructor(){
        this.username = "";
    }

    start(){
        uiElements.MODAL_BACKGROUND.style = "display: flex";
        uiElements.MODAL_START_ROOM ="display: block";
        document.querySelector("main").style = "filter: blur(3px)";
        document.querySelector("header").style = "filter: blur(3px)";
        this.setListeners();
    }

    setListeners(){
        uiElements.MODAL_FORM_USERNAME.addEventListener("submit", (event) => {
            event.preventDefault();
            this.username = uiElements.MODAL_START_USERNAME_INPUT.value;
            this.closeModal();
        });
        uiElements.MODAL_LINK_CREATE_ROOM.addEventListener("click", () => {
            this.changeToScreen("screen-create-link");
        });
        uiElements.COPY_TO_CLIPBOARD.addEventListener("click", () => {
            let copy = uiElements.MODAL_INVITELINK,
                range = document.createRange();
            range.selectNode(copy);
            window.getSelection().addRange(range);
            document.execCommand("copy");
        });
        uiElements.MODAL_LINK_ENTER_ROOM.addEventListener("click", () => {
            this.changeToScreen("screen-username");
        });
    }

    changeToScreen(screen){
        if (screen === "screen-username") {
            uiElements.MODAL_FORM_CREATEROOM.style ="display: none";
            uiElements.MODAL_FORM_USERNAME.style = "display: block";
        } else if(screen === "screen-create-link") {
            uiElements.MODAL_FORM_USERNAME.style = "display: none";
            uiElements.MODAL_FORM_CREATEROOM.style ="display: block";
        }
    }

    closeModal(){
        uiElements.MODAL_BACKGROUND.style = "display: none;";
        document.querySelector(".modalbox.start-room").style = "display: none";
        document.querySelector("main").style = "filter: none";
        document.querySelector("header").style = "filter: none";
    }

}

export default Roomstarter;