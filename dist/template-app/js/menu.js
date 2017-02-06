"use strict";
const fs = require("fs");

class Music {
  constructor() {
    this.timer = '';
    this.filesBrowsed().filesList();
  }
  //上传列表
  filesList() {
    const self = this,
          $jiabtn = document.querySelector('#more-btn'),
          $multiBtn = document.querySelector("#multi-btn");//多选按钮
          
    self.dispatchEvent($jiabtn,$multiBtn);

    $multiBtn.addEventListener('change',function(e) {
      let files = e.target.files,
          songList = [];//音乐列表

      if(files && 0 in files){
        for(let i = 0,len = files.length;i < len;i++){
          var per = {
            name:files[i].name,
            path:files[i].path
          }
          songList.push(per);//音乐列表
        }
        //拼合音乐列表
        var $list = songList.map((item,index)=>{
          return `<tr>
            <td data-path="${item.path}">${index+1}.${item.name.slice(0,26)}</td>
          </tr>`;
        }).join('');

        var $musList = document.querySelector("#music-list tbody");//音乐列表
        $musList.innerHTML = $list;
      }
    },false);

    return self;
  }
  //选择
  filesBrowsed() {
    const self = this,
      $jiabtn = document.querySelector('#select-btn'),
      $chk = document.querySelector('#checkmusic');

    self.dispatchEvent($jiabtn,$chk);

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

    return self;
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
  // 触发器
  dispatchEvent($jiabtn,$chk) {
    $jiabtn.addEventListener('click', function () {
      var evt = document.createEvent('Events');
      evt.initEvent('click', false, false);
      $chk.dispatchEvent(evt);
    }, false);
  }
}
new Music();