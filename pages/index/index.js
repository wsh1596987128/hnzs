var API_URL = "https://www.gshnw.com/api/index/index.html";
//页面构造
Page({
  data:{
    imgUrls: [
      'https://www.gshnw.com/images/banner1.jpg?v=1.0',
      'https://www.gshnw.com/images/banner2.jpg?v=1.0',
      'https://www.gshnw.com/images/banner3.jpg?v=1.0'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cailist: [],
    page: 1,
    loading: false,
    loadingComplete: false
  },
  //去后台取数据
  getData:function(){
    var that = this
    wx.request({
      url: API_URL,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let dataList = res.data.data;
        wx.hideToast();
        that.setData({
          cailist: dataList,
        });
        wx.stopPullDownRefresh();
      }
    })
  },
  //监听页面加载
  onLoad: function () {
    wx.showToast({
      icon:"loading",
      title:'加载中...'
    });
    this.getData()
  },
  //监听页面下拉事件
  onPullDownRefresh: function () {
    this.getData();
  },
  //监听上滑触底事件
  onReachBottom: function () {
    var that = this;
    that.setData({
        page:that.data.page + 1,
        loadingComplete: false, //把“没有数据”设为true，显示  
        loading: true  //把"上拉加载"的变量设为false，隐藏  
    });
    wx.request({
      url: API_URL+'?page='+that.data.page,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let newList = res.data.data;
        if(res.data.data.length > 0){
          wx.hideToast();
          that.setData({
            cailist: that.data.cailist.concat(newList),
            loading: true,  //把"上拉加载"的变量设为false，隐藏 
            loadingComplete: false
          });
        }else{
          that.setData({
            loading: false,
            loadingComplete: true  //把"上拉加载"的变量设为false，隐藏  
          });
        }
      }
    })
  }
})