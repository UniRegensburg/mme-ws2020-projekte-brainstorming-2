/* eslint-env browser */

class LiteratureExport {

  constructor(literatureArray) {
    this.literatureArray = literatureArray;
  }

  saveTextFile() {
    let content = "";
    var blob = null;
    this.literatureArray.forEach(entry => {
      content += this.parseLiterature(entry).toString() ;
    });
    blob = new Blob([content.toString()], { type: "text/plain;charset=utf-8" });
    // eslint-disable-next-line no-undef
    saveAs(blob, "lib.txt");
  }

  parseLiterature(literature) {
    let data = literature.getObject();
    return `${data.author}: ${data.name} [${data.year}], Pages: ${data.pages}, ${data.link}\n`;
  }

}

export default LiteratureExport;