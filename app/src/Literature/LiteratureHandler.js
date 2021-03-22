/* eslint-env browser */

import Observable, { Event } from "../Observable.js";
import uiElements from "../uiElements.js";
import LiteratureEntry from "./LiteratureEntry.js";
import LiteratureView from "./LiteratureView.js";

class LiteratureHandler extends Observable{

    constructor(){
        super();
        this.setListener();
    }

    setListener(){
        uiElements.BTN_ADD_LITERATURE.addEventListener("click", () => {
            uiElements.MODAL_BACKGROUND.style = "display: flex";
            uiElements.MODAL_ADD_LITERATURE.style = "diplay: block";
        });
        uiElements.MODAL_FORM_LITERATURE.addEventListener( "submit", (event) => {
            event.preventDefault();
            this.addtoList();
            this.closeModal();
        });
        uiElements.MODAL_LITERATURE_CLOSE.addEventListener("click", this.closeModal);
    }

    closeModal(){
        uiElements.MODAL_BACKGROUND.style = "display: none";
        uiElements.MODAL_ADD_LITERATURE.style = "diplay: none";
    }

    addtoList(){
        let title = document.getElementById("input-set-title").value,
            author = document.getElementById("input-set-author").value,
            year = document.getElementById("input-set-year").value,
            url = document.getElementById("input-set-url").value,
            pages = document.getElementById("input-set-pages").value,
            entry = new LiteratureEntry(title, author, year, url, pages),
            view = new LiteratureView(entry),
            Literature = entry.getObject(),
            ev = new Event ( "AddLiterature" , Literature);
        this.notifyAll(ev);    
        view.createDOMElement();
    }

}

export default LiteratureHandler;