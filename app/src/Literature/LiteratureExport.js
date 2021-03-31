/* eslint-env browser */

class LiteratureExport {

  constructor(literatureArray) {
    this.literatureArray = literatureArray;
  }

  saveTextFile() {
    let content = "";
    this.literatureArray.forEach(entry => {
      content += this._parseLiterature(entry).toString() ;
    });
    var blob = new Blob([content.toString()], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "lib.txt");
  }

  _parseLiterature(literature) {
    let data = literature.getObject();
    return `${data.author}: ${data.name} [${data.year}], Pages: ${data.pages}, ${data.link}\n`;
  }
  
}

export default LiteratureExport;