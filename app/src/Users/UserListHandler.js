/* eslint-env browser */

import Config from "../Config.js";
import uiElements from "../uiElements.js";
import User from "./User.js";

class UserListHandler {

    constructor(){
        this.colors = ["#c56cf0", "#ffb8b8", "#ff3838", "#ff9f1a", "#fff200", "#32ff7e", "#7efff5", "#18dcff", "#7d5fff"];
        this.userlist = {};
        this.usernames = new Array();
    }

    addUser(name){
        let user = new User(name, this.generateRandomColor());
        this.userlist[user.name] = user.getColor();
        this.usernames.push(name);
        user.createDOMElement();
    }

    clearUserlist(){
        uiElements.UL_USERLIST.innerHTML = "";
        this.usernames = [];
    }

    generateRandomColor(){
        let number = Math.floor(Math.random() * (Config.MAX_USER_COLORS - 0)) + 0;
        return this.colors[number];
    }

    setupUserlist(userlist){
        for (let i = 0; i < userlist.length; i++) {
            const username = userlist[i];
            this.addUser(username);
        }
    }
    
    replaceUsername(oldUsername, newUsername){
        this.userlist = {};
        let list = [...this.usernames],
            index = list.findIndex(user => user === oldUsername);
        list.splice(index,1);
        list.push(newUsername);
        this.clearUserlist();
        this.setupUserlist(list);
    }

    getUserlist(){
        return this.userlist;
    }
}

export default UserListHandler;