/* eslint-env browser */

import { Event, Observable } from "../Observable.js";
import uiElements from "../uiElements.js";
import ChatMessage from "./ChatMessage.js";
import MessageView from "./MessageView.js";

class ChatHandler extends Observable{

    constructor(username){
        super();
        this.username = username;
        this.setListener();
    }

    setListener(){
        uiElements.BTN_SEND_MESSAGE.addEventListener("click", () => {
            let messageContent = uiElements.INPUT_MESSAGE.value,
                date = new Date(),
                hour = date.getHours(),
                minutes = date.getMinutes(),
                time = `${hour}:${minutes}`,
                chatMessage = new ChatMessage(this.username, messageContent, time),
                messageView = new MessageView(chatMessage),
                ev = new Event ("SendChatMessage", messageContent);
            messageView.createDOMElement();
            this.notifyAll(ev);
            uiElements.INPUT_MESSAGE.value = "";
        });
        
        this.addEventListener( "NewChatMessage", (event) => {
            console.log("ChatHandler: New Message");
            console.log(event);
        });
    }

}

export default ChatHandler;