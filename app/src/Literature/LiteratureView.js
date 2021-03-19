/* eslint-env browser */

import uiElements from "../uiElements.js";
import literatureEntry from "./LiteratureEntry.js";

class LiteratureView {

    constructor(literatureEntry){
        this.literatureEntry = literatureEntry;
        this.literatureElement = uiElements.TEMPLATE_LITERATURE.content.cloneNode(true);
    }

    createDOMElement(){
        this.literatureElement.querySelector(".literature-title").innerHTML = this.literatureEntry.title;
        this.literatureElement.querySelector(".literature-author").innerHTML = `<b>Author: </b> ${this.literatureEntry.author}`;
        this.literatureElement.querySelector(".literature-year").innerHTML = `<b>Year: </b> ${this.literatureEntry.year}`;
        if ( this.literatureEntry.url.length !== 0) { this.literatureElement.querySelector(".literature-url").innerHTML = `<b>URL: </b> ${this.literatureEntry.url}`;}
        if ( this.literatureEntry.pages.length !== 0) { this.literatureElement.querySelector(".literature-pages").innerHTML = `<b>Pages: </b> ${this.literatureEntry.pages}`;}
        this.literatureElement.querySelector(".literature-entry").setAttribute("literature-id", this.literatureEntry.id);
        uiElements.UL_LITERATURE_LIST.appendChild(this.literatureElement);
    }

}

export default LiteratureView;

