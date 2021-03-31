/* eslint-env browser */

import uiElements from "./uiElements.js";
import Observable, { Event } from "./Observable.js";
import Config from "./Config.js";

class RoomManager extends Observable{

    constructor(socketClient){
        super();
        this.socketClient = socketClient;
        this.roomLink = "";
        this.roomName = "";
        this.roomId = "";
        this.username = "";
    }

    start(){
        this.openStartRoomModal();
        this.checkURL();
        this.setListeners();
    }

    setListeners(){
        uiElements.MODAL_FORM_USERNAME.addEventListener("submit", (event) => {
            event.preventDefault();
            this.username = uiElements.MODAL_START_USERNAME_INPUT.value.trim();
            let payload = {username: this.username, roomName: this.roomLink},
                ev = new Event ("RequestJoinRoom", payload);
            this.notifyAll(ev);
        });
        console.log(uiElements.MODAL_LINK_CREATE_ROOM);
        uiElements.MODAL_LINK_CREATE_ROOM.forEach(element => {
            element.addEventListener("click", () => {
                let ev = new Event ("CreateNewRoom");
                this.notifyAll(ev);
            });
        }); 

        uiElements.MODAL_COPY_TO_CLIPBOARD.addEventListener("click", () => {
            let copy = uiElements.MODAL_INVITELINK,
                range = document.createRange();
            range.selectNode(copy);
            window.getSelection().addRange(range);
            document.execCommand("copy");
        });

        uiElements.MODAL_LINK_ENTER_ROOM.addEventListener("click", () => {
            window.sessionStorage.setItem("roomName", this.roomName);
            window.sessionStorage.setItem("roomId", this.roomId);
            window.sessionStorage.setItem("username", this.username);
            window.location.href = `${Config.DEFAULT_CLIENT_URL}#${this.roomLink}`;
            //window.location.reload();
        });
        uiElements.MODAl_FORM_START_HOME.addEventListener("submit", (event) => {
            event.preventDefault();
            let ev = new Event ("CreateNewRoom");
            this.notifyAll(ev);
        });

        uiElements.SETTINGS_INPUT_ROOMNAME.addEventListener("change", () => {
            let newRoomName = uiElements.SETTINGS_INPUT_ROOMNAME.value,
                data = {id: this.roomId, name: newRoomName},
                ev = new Event("RoomNameChanged", data);
            this.notifyAll(ev);
        });

        uiElements.SETTINGS_COPY_TO_CLIPBOARD.addEventListener("click", () => {
            let copy = uiElements.SETTINGS_INVITELINK,
                range = document.createRange();
            range.selectNode(copy);
            window.getSelection().addRange(range);
            document.execCommand("copy");
        });

        uiElements.SETTINGS_BTN_DELETE_ROOM.addEventListener("click", () => {
            let ev = new Event ("DestroyRoom");
            this.notifyAll(ev);
        });

        uiElements.SETTINGS_INPUT_USERNAME.addEventListener("change", () => {
            let newUsername = uiElements.SETTINGS_INPUT_USERNAME.value,
                ev = new Event("ChangeName", newUsername);
            this.notifyAll(ev);
        });
    }

    checkURL(){
        let roomURL = window.location.hash;
        if(roomURL.length === 0){
            this.changeToScreen("screen-start-home");
        }else{
            this.roomLink = roomURL.substring(1);
            this.changeToScreen("screen-username");
        }
    }

    setRoomCreatedScreen(room){
        this.roomLink = room.link;
        this.roomName = room.name;
        this.roomId = room.id;
        uiElements.MODAL_INVITELINK.innerHTML = `${Config.DEFAULT_CLIENT_URL}#${room.link}`;
        this.changeToScreen("screen-create-link");
    }

    setupSettings(){
        uiElements.SETTINGS_INPUT_USERNAME.value = this.username;
        uiElements.SETTINGS_INPUT_ROOMNAME.value = this.roomName;
        uiElements.SETTINGS_INVITELINK.innerHTML = window.location;
    }

    enterRoom(room){
        this.roomName = room.name;
        this.roomId = room.id;
        this.roomLink = room.link;
        this.setupSettings();
        this.closeModal();
    }

    updateRoomName(name){
        uiElements.SETTINGS_INPUT_ROOMNAME.value = name;
    }

    restart(){
        location.href = Config.DEFAULT_CLIENT_URL;
        location.reload();
    }

    /* UI-Modal Function */

    openStartRoomModal(){
        uiElements.MODAL_BACKGROUND.style = "display: flex";
        uiElements.MODAL_START_ROOM ="display: block";
        document.querySelector("main").style = "filter: blur(3px)";
        document.querySelector("header").style = "filter: blur(3px)";
    }

    openJoiningFailedModal(){
        this.changeToScreen("screen-joining-failed");
        this.openStartRoomModal();
    }

    changeToScreen(screen){
        if (screen === "screen-username") {
            uiElements.MODAl_FORM_START_HOME.style = "display: none";
            uiElements.MODAL_FORM_CREATEROOM.style = "display: none";
            uiElements.MODAL_FORM_USERNAME.style = "display: block";
            uiElements.MODAL_FORM_JOINING_FAILED.style = "display:none";
        } else if(screen === "screen-create-link") {
            uiElements.MODAl_FORM_START_HOME.style = "display: none";
            uiElements.MODAL_FORM_USERNAME.style = "display: none";
            uiElements.MODAL_FORM_CREATEROOM.style ="display: block";
            uiElements.MODAL_FORM_JOINING_FAILED.style = "display:none";
        } else if (screen === "screen-start-home") {
            uiElements.MODAl_FORM_START_HOME.style = "display: block";
            uiElements.MODAL_FORM_USERNAME.style = "display: none";
            uiElements.MODAL_FORM_CREATEROOM.style ="display: none";
            uiElements.MODAL_FORM_JOINING_FAILED.style = "display:none";
        } else if(screen === "screen-joining-failed"){
            uiElements.MODAl_FORM_START_HOME.style = "display: none";
            uiElements.MODAL_FORM_CREATEROOM.style = "display: none";
            uiElements.MODAL_FORM_USERNAME.style = "display: none";
            uiElements.MODAL_FORM_JOINING_FAILED.style = "display:block";
        }
    }

    closeModal(){
        console.log("closed");
        uiElements.MODAL_BACKGROUND.style = "display: none;";
        document.querySelector(".modalbox.start-room").style = "display: none";
        document.querySelector("main").style = "filter: none";
        document.querySelector("header").style = "filter: none";
    }

}

export default RoomManager;