/* eslint-env browser */

import uiElements from "../uiElements.js";
import LiteratureEntry from "./LiteratureEntry.js";
import LiteratureView from "./LiteratureView.js";

class LiteratureHandler {

    constructor(){
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
            view = new LiteratureView(entry);
        view.createDOMElement();
    }

}

export default LiteratureHandler;