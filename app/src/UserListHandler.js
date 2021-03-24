/* eslint-env browser */

import uiElements from "./uiElements.js";

class UserListHandler {

    constructor(){
        this.colors = ["#32ff7e", "#fffa65", "#ffaf40", "#ff4d4d", "#cd84f1", "#17c0eb", "#000000", "#fff"];
    }

    createDOMElement(name){
        let color = this.generateRandomColor(),
            userItem = uiElements.TEMPALTE_USER.content.cloneNode(true);
        userItem.querySelector(".username").innerHTML = name;
        userItem.querySelector(".user-item").style = `border-left: 5px solid ${color};`;
        uiElements.UL_USERLIST.appendChild(userItem);
    }

    generateRandomColor(){
        let number = Math.floor(Math.random() * (7 - 0)) + 0;
        return this.colors[number];
    }
}

export default UserListHandler;