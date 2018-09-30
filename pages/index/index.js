// var API_URL = 'https://apis.juhe.cn/cook/category?key=3201e6bae8d5e21f6d12fdbdd0ca6fe4';
var API_URL = "https://apis.juhe.cn/cook/index?&key=3201e6bae8d5e21f6d12fdbdd0ca6fe4";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    cailist: [],
    imgUrls: [
      'https://xcx.wanxue.cn/Yue/public/images/1.jpg',
      'https://xcx.wanxue.cn/Yue/public/images/2.jpg',
      'https://xcx.wanxue.cn/Yue/public/images/3.jpg',
      'https://xcx.wanxue.cn/Yue/public/images/4.jpg',
      'https://xcx.wanxue.cn/Yue/public/images/5.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.showToast({
      title:'加载中。。。',
      icon:"loading",
      duration:10000
    });

    wx.request({
      url: API_URL + '&cid=1',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let dataList = res.data.result.data; //获取到的数据
        dataList.forEach((item) => {
          item.tags = item.tags.substring(0, 36)+'...'; //要截取字段的字符串
        })
        // console.log(res.data.result.data);
        wx.hideToast();
        that.setData({
          cailist: dataList,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})