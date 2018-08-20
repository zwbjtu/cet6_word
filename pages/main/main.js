//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowW:0,
    windowH:0,
    level:0,
    worldRanking:0,
    friendRanking:0,
    rate:20,
    // local data
    totalChallenge:0,
    winningStreak:0,
    maxScore:0,
    totalInvitation:0,
    invitationWin:0,
    invitationWinRate:0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#bf70d6',
    });
    this.initUserInfo();
    this.initData();
  },

  initUserInfo:function(){
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },

  initData:function(){
    console.log('initData total:' + app.globalData.total + ' rate:' + app.globalData.rate);
    this.setData({
      worldRanking: app.globalData.userRanking,
      level: app.scoreConvertLevel(app.globalData.totalScore),
      friendRanking: app.globalData.totalScore,
      rate: Math.round(app.globalData.userRanking * 100 / app.globalData.total),
      totalChallenge: app.globalData.achievementDetail.totalChallenge,
      winningStreak: app.globalData.achievementDetail.winningStreak,
      maxScore: app.globalData.achievementDetail.maxScore,
      totalInvitation: app.globalData.achievementDetail.totalInvitation,
      invitationWin: app.globalData.achievementDetail.invitationWin,
      invitationWinRate: app.globalData.achievementDetail.totalInvitation==0 ? 0: parseInt(app.globalData.achievementDetail.invitationWin * 100 / app.globalData.achievementDetail.totalInvitation),
    });
  },

  onShareAppMessage: function (ops) {
    if (ops.from == 'button') {
      return {
        title: '[有人@我]看看你的四级词汇量能排第几',
        path: 'pages/home/home',
        imageUrl: 'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/share/share_invite_logo.png',
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          app.getShareTicket(res);
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    } else {
      return {
        title: '[有人@我]看看你的四级词汇量能排第几',
        path: 'pages/home/home',
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          app.getShareTicket(res)
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    }
  },
})
