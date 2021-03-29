/* eslint-env browser */

import { Event, Observable } from "../Observable.js";
import uiElements from "../uiElements.js";
import ChatMessage from "./ChatMessage.js";
import MessageView from "./MessageView.js";

class ChatHandler extends Observable{

    constructor(username, userlistHandler){
        super();
        this.username = username;
        this.userlistHandler = userlistHandler;
        this.color = userlistHandler.getUserlist().username;
        this.setListener();
    }

    setListener(){
        uiElements.BTN_SEND_MESSAGE.addEventListener("click", () => {
            let messageContent = uiElements.INPUT_MESSAGE.value,
                chatMessage = this.addMessage(this.username, messageContent),
                ev = new Event ("SendChatMessage", chatMessage.getObject());
            this.notifyAll(ev);
            uiElements.INPUT_MESSAGE.value = "";
        });
    }

    addMessage(username, message){
        let userlist = this.userlistHandler.getUserlist(),
            color = userlist[username],
            chatmessage = new ChatMessage(username, color, message),
            messageView = new MessageView(chatmessage);
        messageView.createDOMElement();
        return chatmessage;
    }

    updateUsername(username){
        this.username = username;
    }

}

export default ChatHandler;