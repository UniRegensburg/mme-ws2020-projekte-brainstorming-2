/* eslint-env browser */

import { Observable, Event } from "../Observable.js";
import uiElements from "../uiElements.js";

class LiteratureView extends Observable{

    constructor(literatureEntry){
        super();
        this.literatureEntry = literatureEntry;
        this.literatureElement = uiElements.TEMPLATE_LITERATURE.content.cloneNode(true);
    }

    createDOMElement(){
        this.literatureElement.querySelector(".literature-title").innerHTML = this.literatureEntry.title;
        this.literatureElement.querySelector(".literature-author").innerHTML = `<b>Author: </b> ${this.literatureEntry.author}`;
        this.literatureElement.querySelector(".literature-year").innerHTML = `<b>Year: </b> ${this.literatureEntry.year}`;
        if ( this.literatureEntry.link !== null && this.literatureEntry.link.length !== 0) { this.literatureElement.querySelector(".literature-url").innerHTML = `<b>URL: </b> ${this.literatureEntry.link}`;}
        if ( this.literatureEntry.pages !== null && this.literatureEntry.pages[0] !== "" ) { this.literatureElement.querySelector(".literature-pages").innerHTML = `<b>Pages: </b> ${this.literatureEntry.pages}`;}
        this.literatureElement.querySelector(".literature-entry").setAttribute("literature-id", this.literatureEntry.id);
        this.literatureElement.querySelector(".button-delete-literature").addEventListener("click", () => {
            let ev = new Event ("RequestRemoveLiterature", this.literatureEntry.id);
            this.notifyAll(ev);
        });
        uiElements.UL_LITERATURE_LIST.appendChild(this.literatureElement);
    }

}

export default LiteratureView;

