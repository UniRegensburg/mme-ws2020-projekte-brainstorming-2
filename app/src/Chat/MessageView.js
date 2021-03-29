/* eslint-env browser */

import uiElements from "../uiElements.js";

class MessageView {

    constructor(chatMessage){
        this.chatMessage = chatMessage;
        this.messageElement = uiElements.TEMPLATE_MESSAGE.content.cloneNode(true);
    }

    createDOMElement(){
        this.messageElement.querySelector(".message.sender").innerHTML = this.chatMessage.sender;
        this.messageElement.querySelector(".message.sender").style = `color: ${this.chatMessage.color}`;
        this.messageElement.querySelector(".message.content").innerHTML = this.chatMessage.messageContent;
        this.messageElement.querySelector(".message.time").innerHTML = this.chatMessage.time;
        uiElements.UL_MESSAGE_HISTORY.appendChild(this.messageElement);
        this.updateScroll();
    }

    updateScroll(){
        let history = uiElements.UL_MESSAGE_HISTORY;
        history.scrollTop = history.scrollHeight;
    }

}

export default MessageView;

