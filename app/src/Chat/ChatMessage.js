/* eslint-env browser */

class ChatMessage {

    constructor(sender, color, messageContent){
        this.sender = sender;
        this.color = color;
        this.messageContent = messageContent;
        this.time = this.getTime();
    }

    getTime(){
        let date = new Date(),
            hour = date.getHours(),
            minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(),
            time = `${hour}:${minutes}`;
        return time;
    }

    getObject(){
        let payload = {
            message: this.messageContent,
            username: this.sender,
        };
        return payload;
    }

}

export default ChatMessage;