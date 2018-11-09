var API_URL = "https://www.gshnw.com/api/index/index.html";
//页面装载
Page({
  //初始化数据
  data:{
    itype: 1,
    cailist: [],
    page: 1,
    loading: false,
    loadingComplete: false
  },
  //监听页面加载
  onLoad: function (options){
    var that = this;
    wx.showToast({
      icon: "loading",
      title: '加载中...'
    });
    that.setData({
      itype:options.type
    });
    this.getData();
  },
  //去后台取数据
  getData: function () {
    var that = this
    wx.request({
      url: API_URL + '?type=' + that.data.itype,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let dataList = res.data.data; //获取到的数据
        wx.hideToast();
        that.setData({
          cailist: dataList,
        });
        wx.stopPullDownRefresh();
      }
    })
  },
  //监听页面下拉事件
  onPullDownRefresh: function () {
    this.getData()
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    var that = this;
    that.setData({
      page: that.data.page + 1,
      loadingComplete: false, //把“没有数据”设为true，显示  
      loading: true  //把"上拉加载"的变量设为false，隐藏  
    });
    wx.request({
      url: API_URL + '?type=' + that.data.itype + '&page=' + that.data.page,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let newList = res.data.data;
        if (res.data.data.length > 0) {
          wx.hideToast();
          that.setData({
            cailist: that.data.cailist.concat(newList),
            loading: true,  //把"上拉加载"的变量设为false，隐藏 
            loadingComplete: false
          });
        } else {
          that.setData({
            loading: false,
            loadingComplete: true  //把"上拉加载"的变量设为false，隐藏  
          });
        }
      }
    })
  }
})