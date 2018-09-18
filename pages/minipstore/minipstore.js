//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowW: 0,
    windowH: 0,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#a753d6',
    });

    this.initUserInfo();
    this.initData();
  },
  onClickCover: function() {
    wx.navigateToMiniProgram({
      appId: 'wx7cf81d27e6c79640',
      success(res) {
        console.info(res);
      }
    });
  },
  initUserInfo: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },

  initData: function () {
  },
})
