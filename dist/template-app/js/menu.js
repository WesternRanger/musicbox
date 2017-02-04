"use strict";
class Music {
  constructor() {
    this.dragfile();
  }
  dragfile() {
    const holder = document.getElementById('holder')
    holder.ondragover = () => {
      return false;
    }
    holder.ondragleave = holder.ondragend = () => {
      return false;
    }
    holder.ondrop = (e) => {
      e.preventDefault()
      console.log(e.dataTransfer.files)
      for (let f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
      }
      return false;
    }
  }
}
new Music();