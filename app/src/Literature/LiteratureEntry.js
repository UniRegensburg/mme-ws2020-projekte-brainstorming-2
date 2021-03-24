/* eslint-env browser */

class LiteratureEntry {

    constructor(title, author, year, url, pages){
        this.title = title;
        this.author = author;
        this.year = year;
        this.url = url;
        this.pages = this.getPagesArray(pages);
        this.id = Date.now().toString();
    }

    getObject(){
        let Literature = {
            id: this.id,
            name: this.title,
            author: this.author,
            url: this.url, 
            pages: this.pages,
        };
        return Literature;
    }

    getPagesArray(string){
        let str = string.toString().trim(),
            result = str.split(",");
        return result;
    }

}

export default LiteratureEntry;