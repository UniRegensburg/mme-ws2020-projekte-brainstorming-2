class LiteratureExport {
  constructor(literatureArray) {
    this.literatureArray = literatureArray;
  }

  saveTextFile() {
    let content = this.literatureArray.forEach((l) => this._parseLiterature(l));
    var blob = new Blob(content, { type: "text/plain;charset=utf-8" });
    saveAs(blob, "lib.txt");
  }

  _parseLiterature(literature) {
    let data = literature.getObject();

    return `${data.author}: ${data.title} [${data.year}], ${data.pages[0]} - ${data.pages[1]}, ${data.url}\n`;
  }
}

// new LiteratureExport(literature).saveTextFile()
