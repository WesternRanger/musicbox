"use strict";
const fs = require("fs");

class Music {
  constructor() {
    this.timer = '';
    this.filesBrowsed();
  }
  //选择
  filesBrowsed() {
    const self = this,
      $jiabtn = document.querySelector('#select-btn'),
      $chk = document.querySelector('#checkmusic');

    //触发选择
    $jiabtn.addEventListener('click', function () {
      var evt = document.createEvent('Events');
      evt.initEvent('click', false, false);
      $chk.dispatchEvent(evt);
    }, false);
    //选择音乐
    $chk.addEventListener('change', function (e) {
      let files = e.target.files;
      if (files && files.length > 0) {
        var chkMus = {
          path: files[0].path,
          name: files[0].name
        }
        //播放音乐
        self.play(chkMus);
      }
    }, false);
  }
  //播放器设置
  play(chkMus) {
    var self = this;
    clearTimeout(self.timer);
    //播放音乐
    const musicName = document.querySelector('#music-name');
    const audioPlayer = document.querySelector('#audio-player');
    audioPlayer.setAttribute('src', chkMus.path);
    audioPlayer.setAttribute('autoplay', 'autoplay');

    //滚动歌词
    const msg = "…正在播放-" + chkMus.name;
    let pos = 0;
    function scrollMSG() {
        musicName.innerHTML = msg.substring(pos, msg.length) + msg.substring(0, pos);
        pos++;
        if (pos >  msg.length) pos = 0
        self.timer = window.setTimeout(scrollMSG,400);
    }
    scrollMSG();
  }
}
new Music();