/* eslint-env browser */

import uiElements from "../uiElements.js";
import ChatMessage from "./ChatMessage.js";
import MessageView from "./MessageView.js";

class ChatHandler {

    constructor(username){
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
                messageView = new MessageView(chatMessage);
            messageView.createDOMElement();
            uiElements.INPUT_MESSAGE.value = "";
        });
    }

}

export default ChatHandler;