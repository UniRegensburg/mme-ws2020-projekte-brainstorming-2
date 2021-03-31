/* eslint-env browser */

import Observable, { Event } from "../Observable.js";
import uiElements from "../uiElements.js";
import LiteratureEntry from "./LiteratureEntry.js";
import LiteratureView from "./LiteratureView.js";
import LiteratureExport from "./LiteratureExport.js";

class LiteratureHandler extends Observable{

    constructor(){
        super();
        this.literatureList = new Array();
        this.setListener();
    }

    setListener(){
        uiElements.BTN_ADD_LITERATURE.addEventListener("click", () => {
            uiElements.MODAL_BACKGROUND.style = "display: flex";
            uiElements.MODAL_ADD_LITERATURE.style = "diplay: block";
        });
        uiElements.BTN_EXPORT_LITERATURE.addEventListener("click", () => {
            new LiteratureExport(this.literatureList).saveTextFile();
        });
        uiElements.MODAL_FORM_LITERATURE.addEventListener( "submit", (event) => {
            event.preventDefault();
            this.requestAddingEntry();
        });
        uiElements.MODAL_LITERATURE_CLOSE.addEventListener("click", this.closeModal);
    }

    closeModal(){
        uiElements.MODAL_BACKGROUND.style = "display: none";
        uiElements.MODAL_ADD_LITERATURE.style = "diplay: none";
    }

    requestAddingEntry(){
        let title = document.getElementById("input-set-title").value,
            author = document.getElementById("input-set-author").value,
            year = document.getElementById("input-set-year").value,
            url = document.getElementById("input-set-url").value,
            pages = document.getElementById("input-set-pages").value,
            payload = new LiteratureEntry(title, author, year, url, pages).getObject(),
            ev = new Event ( "AddLiterature" , payload);
        this.notifyAll(ev);  
    }

    setupLiteraturelist(list){
        list.forEach(entry => {
            this.addToList(entry);
        });
    }

    addToList(literature){
        let entry = new LiteratureEntry(literature.name, literature.author, literature.year, literature.link, literature.pages, literature.id),
            view = new LiteratureView(entry);  
        view.createDOMElement();
        view.addEventListener("RequestRemoveLiterature", (event) => {
            this.notifyAll(event);
        });
        this.literatureList.push(entry);
        this.closeModal();
    }

    removeFromList(id){
        let element = document.querySelector(`[literature-id="${id}"]`),
            index = this.literatureList.findIndex(entry => entry.id === id);
        element.remove();
        this.literatureList.splice(index);
    }

}

export default LiteratureHandler;