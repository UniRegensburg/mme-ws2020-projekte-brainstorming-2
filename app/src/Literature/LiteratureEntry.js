/* eslint-env browser */

class LiteratureEntry {

    constructor(title, author, year, link, pages, id){
        this.title = title;
        this.author = author;
        this.year = year;
        this.link = link;
        this.pages = this.getPagesArray(pages);
        this.id = null;
        if(id){
            this.id = id;
        }
    }

    getObject(){
        let Literature = {
            name: this.title,
            author: this.author,
            link: this.link,
            year: this.year, 
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