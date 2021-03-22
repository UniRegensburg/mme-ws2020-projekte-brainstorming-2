/* eslint-env browser */

import uiElements from "./uiElements.js";
import Observable, { Event } from "./Observable.js";
import Config from "./Config.js";

class Roomstarter extends Observable{

    constructor(socketClient){
        super();
        this.socketClient = socketClient;
        this.roomLink = "";
        this.username = "";
    }

    start(){
        uiElements.MODAL_BACKGROUND.style = "display: flex";
        uiElements.MODAL_START_ROOM ="display: block";
        document.querySelector("main").style = "filter: blur(3px)";
        document.querySelector("header").style = "filter: blur(3px)";
        this.checkURL();
        this.setListeners();
    }

    setListeners(){
        uiElements.MODAL_FORM_USERNAME.addEventListener("submit", (event) => {
            event.preventDefault();
            this.username = uiElements.MODAL_START_USERNAME_INPUT.value;
            this.socketClient.requestJoinRoom(this.username, this.roomLink);
            this.closeModal();
        });
        uiElements.MODAL_LINK_CREATE_ROOM.addEventListener("click", () => {
            let ev = new Event ("CreateNewRoom");
            this.notifyAll(ev);
        });
        uiElements.COPY_TO_CLIPBOARD.addEventListener("click", () => {
            let copy = uiElements.MODAL_INVITELINK,
                range = document.createRange();
            range.selectNode(copy);
            window.getSelection().addRange(range);
            document.execCommand("copy");
        });
        uiElements.MODAL_LINK_ENTER_ROOM.addEventListener("click", () => {
            window.location.href = `${Config.DEFAULT_CLIENT_URL}#${this.roomLink}`;
            window.location.reload();
        });
        uiElements.MODAl_FORM_START_HOME.addEventListener("submit", (event) => {
            event.preventDefault();
            let ev = new Event ("CreateNewRoom");
            this.notifyAll(ev);
        });
    }

    changeToScreen(screen){
        if (screen === "screen-username") {
            uiElements.MODAl_FORM_START_HOME.style = "display: none";
            uiElements.MODAL_FORM_CREATEROOM.style = "display: none";
            uiElements.MODAL_FORM_USERNAME.style = "display: block";
        } else if(screen === "screen-create-link") {
            uiElements.MODAl_FORM_START_HOME.style = "display: none";
            uiElements.MODAL_FORM_USERNAME.style = "display: none";
            uiElements.MODAL_FORM_CREATEROOM.style ="display: block";
        } else if (screen === "screen-start-home") {
            uiElements.MODAl_FORM_START_HOME.style = "display: block";
            uiElements.MODAL_FORM_USERNAME.style = "display: none";
            uiElements.MODAL_FORM_CREATEROOM.style ="display: none";
        }
    }

    closeModal(){
        uiElements.MODAL_BACKGROUND.style = "display: none;";
        document.querySelector(".modalbox.start-room").style = "display: none";
        document.querySelector("main").style = "filter: none";
        document.querySelector("header").style = "filter: none";
    }

    checkURL(){
        let roomURL = window.location.hash;
        if(roomURL.length === 0){
            console.log("No Room");
            this.changeToScreen("screen-start-home");
        }else{
            this.roomLink = roomURL.substring(1);
            this.changeToScreen("screen-username");
            console.log("Roomstarter: Room-URL not empty");
            console.log(this.roomLink);
        }
    }

    setRoomCreatedScreen(roomLink){
        this.roomLink = roomLink;
        uiElements.MODAL_INVITELINK.innerHTML = `${Config.DEFAULT_CLIENT_URL}#${roomLink}`;
        this.changeToScreen("screen-create-link");
    }

}

export default Roomstarter;