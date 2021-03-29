/* eslint-env browser */

import User from "./User.js";

class UserListHandler {

    constructor(){
        this.colors = ["#c56cf0", "#ffb8b8", "#ff3838", "#ff9f1a", "#fff200", "#32ff7e", "#7efff5", "#18dcff", "#7d5fff"];
        this.userlist = {};
    }

    addUser(name){
        let user = new User(name, this.generateRandomColor());
        this.userlist[user.name] = user.getColor();
        user.createDOMElement();
    }

    generateRandomColor(){
        let number = Math.floor(Math.random() * (7 - 0)) + 0;
        return this.colors[number];
    }

    setupUserlist(userlist){
        for (let i = 0; i < userlist.length; i++) {
            const username = userlist[i];
            this.addUser(username);
        }
    }
    
    replaceUsername(oldUsername, newUsername){
        for (let i = 0; i < this.userlist.length; i++) {
            if(this.userlist[i] === oldUsername){
                this.userlist[i] = newUsername;
            }
        }
    }

    getUserlist(){
        return this.userlist;
    }
}

export default UserListHandler;