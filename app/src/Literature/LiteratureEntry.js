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

    getObject(){
        let Literature = {
            id: this.id,
            title: this.title,
            author: this.author,
            url: this.url, 
            pages: this.pages,
        };
        return Literature;
    }

}

export default LiteratureEntry;