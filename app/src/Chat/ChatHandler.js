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
                ev = new Event ("SendChatMessage", messageContent);
            messageView.createDOMElement();
            this.notifyAll(ev);
            uiElements.INPUT_MESSAGE.value = "";
        });
    }

    addMessage(payload){
        let message = new ChatMessage("User?", payload),
            messageView = new MessageView(message);
        messageView.createDOMElement();
    }

    updateUsername(username){
        this.username = username;
    }

}

export default ChatHandler;