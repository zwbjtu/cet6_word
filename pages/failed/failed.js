//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    showModal:true,
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    console.log(' enter onLoad !');
  },

  preventTouchMove: function () {
    console.log(' preventTouchMove !');
  },
})
