/* eslint-env browser */

import uiElements from "../uiElements.js";

class User {

    constructor(name, color){
        this.name = name;
        this.color = color;
    }

    createDOMElement(){
        let userItem = uiElements.TEMPALTE_USER.content.cloneNode(true);
        userItem.querySelector(".username").innerHTML = this.name;
        userItem.querySelector(".user-item").style = `border-left: 5px solid ${this.color};`;
        uiElements.UL_USERLIST.appendChild(userItem);
    }

    getObject(){
        let user = {
            name: this.name,
            color: this.color,
        };
        return user;
    }

    getColor(){
        return this.color;
    }

}

export default User;