/* eslint-env browser */

class LiteratureEntry {

    constructor(title, author, year, url, pages){
        this.title = title;
        this.author = author;
        this.year = year;
        this.url = url;
        this.pages = pages;
        this.id = Date.now().toString();
    }

}

export default LiteratureEntry;