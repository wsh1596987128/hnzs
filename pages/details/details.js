var API_URL = "https://www.gshnw.com/api/index/getContent.html";
var WxParse = require('../../wxParse/wxParse.js');
const myaudio = wx.getBackgroundAudioManager();
Page({
  //页面的初始数据
  data: {
    details: [],
    isplay: false,
    sliderMax: 1,
    sliderValue: 0,
    totalProcess: '00:00',
    currentTime: '00:00'
  },
  //监听页面加载
  onLoad: function (e){
    var that = this
    wx.showToast({
      icon: "loading", 
      title: '加载中...'
    });
    wx.request({
      url: API_URL + '?id=' + e.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.data.title.length > 12) {
          res.data.data.alt = res.data.data.title.substring(0, 12) + '...'
        } else {
          res.data.data.alt = res.data.data.title
        }
        that.setData({
          details: res.data.data,
        });
        if (res.data.data.type == 1) {
          myaudio.src = res.data.data.media;
          myaudio.startTime = 0;
          myaudio.title = res.data.data.title;
          myaudio.singer = res.data.data.author;
          myaudio.coverImgUrl = res.data.data.thumb;
        }
        var content = res.data.data.content;
        WxParse.wxParse('content', 'html', content, that, 25);
      }
    });
    myaudio.onPlay(() => {
      myaudio.play();
      this.setData({ isplay: true });
    });
    myaudio.onPause(() => {
      myaudio.pause();
      this.setData({ isplay: false });
    });
    myaudio.onStop(() => {
      myaudio.stop();
      this.setData({ isplay: false });
    })
    myaudio.onTimeUpdate(() => {
      that.timeUpdateData();
    })
  },
  //播放  
  play: function () {
    myaudio.startTime = myaudio.currentTime;
    myaudio.play();
    this.setData({ isplay: true });
  },
  // 停止  
  stop: function () {
    myaudio.pause();
    this.setData({ isplay: false });
  },
  //实时更新播放时间
  timeUpdateData: function () {
    this.setData({
      sliderMax: parseInt(myaudio.duration) || 1,
      totalProcess: this.formatSeconds(myaudio.duration),
      currentTime: this.formatSeconds(myaudio.currentTime),
      sliderValue: parseInt(myaudio.currentTime) || 0
    });
  },
  //时间格式化
  formatSeconds: function (e) { //将秒数换成时分秒格式
    var secondTime = parseInt(e);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if (secondTime > 59) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if (minuteTime > 59) {
        //获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        //获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    var result = "";
    if (hourTime > 0) {
      if (hourTime < 10) {
        hourTime = "0" + hourTime;
      }
      result = hourTime + ":";//小时
    }
    if (minuteTime > 0) {
      if (minuteTime < 10) {
        minuteTime = "0" + minuteTime;
      }
      result = result + minuteTime; //分
    } else {
      result = "00";
    }
    if (secondTime < 10) {
      secondTime = "0" + secondTime;
    }
    result = result + ":" + secondTime; //秒
    return result;
  }
})