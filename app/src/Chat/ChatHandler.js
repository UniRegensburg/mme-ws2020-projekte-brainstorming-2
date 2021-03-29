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
                chatMessage = new ChatMessage(this.username, messageContent),
                messageView = new MessageView(chatMessage),
                ev = new Event ("SendChatMessage", chatMessage.getObject());
            messageView.createDOMElement();
            this.notifyAll(ev);
            uiElements.INPUT_MESSAGE.value = "";
        });
    }

    addMessage(payload){
        let message = new ChatMessage(payload.username , payload.message),
            messageView = new MessageView(message);
        messageView.createDOMElement();
    }

    updateUsername(username){
        this.username = username;
    }

}

export default ChatHandler;