//app.js

var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');

App({
  onLaunch: function() {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    qcloud.setLoginUrl(config.service.loginUrl);
    this.doLogin();
    this.getUserInfo();
    this.getLevelRule();
    this.getCategory(); 
    this.getDataFromStorage();
    this.getShareTargeOpenGId();
    //this.getContinueWinFromStorage();
  },

  doLogin() { //登录
    let that = this
    //util.showBusy('正在登录');
    qcloud.login({
      success(result) { //此处的result竟然不包含openid,所以res取缓存中的数据
        console.log('登录成功-----')
        let res = wx.getStorageSync('user_info_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A');
        console.log('openId:' + res.openId)
        that.globalData.openId = res.openId;
        console.log(res)
        that.getScoreInfo();
      },
      fail(error) {
        console.log('登录失败', error);
      }
    });
  },

  globalData: {
    userInfo: null,
    userInfo1:null,
    question:null,
    openId: null,
    userRanking: 0,
    totalScore: 0,
    total: 10000,
    level: 1,
    categoryTree: null,
    categoryStudyTree: null,
    categoryPKTree: null,
    rate: 0,
    rule: null,
    openGids:[],
    updateScoreInfoCallBack: null,
    scoreInfo: {
      totalScore: 0,
      experience: 0,
      worldRanking: 0,
      total: 0,
      victorynum:0,
    },
    achievementDetail: {
      totalChallenge: 0,
      winningStreak: 0,
      maxScore: 0, 
      totalInvitation: 0,
      invitationWin: 0,
      invitationWinRate: 0,
    },
    abortExit: false,
    continueWinCount:0,
  },
  setUserInfo: function(res) {
    console.log('setUserInfo:')
    console.log(res)
    this.globalData.userInfo = res.userInfo;
  },
  getUserInfo: function() {
    // 获取用户信息
    console.log('getUserInfo!')
    wx.getSetting({ 
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  requestQuestionList: function(page, id) {
    var that = this;
    console.log('enter  requestQuestionList');
    qcloud.request({
      url: config.service.requestQuestionList,
      header: {
        'content-type': 'application/json'
      },
      data: { //这里写你要请求的参数
        category_id: 10,
        page_index: 0
      },
      success: (response) => {
        console.log('请求成功 statusCode:' + response.statusCode);
        console.log(response.data.data);
      },
      fail: function(err) {
        conssole.log('请求失败23', err);
      }
    });
  },
  getScoreInfo: function() {
    var that = this;
    qcloud.request({
      url: config.service.getScoreInfo,
      header: {
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        openId: that.globalData.openId,
      },
      success: (response) => {
        console.log('请求 getScoreInfo 成功 statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          that.globalData.scoreInfo = response.data.data;
          console.log(response.data.data);
          that.globalData.totalScore = that.globalData.scoreInfo.totalScore;
          that.globalData.userRanking = that.globalData.scoreInfo.worldRanking;
          that.globalData.total = that.globalData.scoreInfo.total;
          console.log('updateScoreInfoCallBack total:' + that.globalData.total);
          console.log(that.globalData.updateScoreInfoCallBack)
          if (that.globalData.updateScoreInfoCallBack != null) {
            that.globalData.updateScoreInfoCallBack(that.globalData.scoreInfo);
          }
        }
      },
      fail: function(err) {
        console.log('请求失败', err);
      }
    });
  },
  getLevelRule: function() {
    var that = this;
    qcloud.request({
      url: config.service.getLevelRule,
      header: {
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        openId: that.globalData.openId,
      },
      success: (response) => {
        console.log('getLevelRule 请求成功 statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          that.globalData.rule = response.data.data;
          console.log(that.globalData.rule);
        }
      },
      fail: function(err) {
        console.log('请求 LevelRule 失败', err);
      }
    });
  },
  getWorldRankingList: function() {
    var that = this;
    qcloud.request({
      url: config.service.getWorldRankingList,
      header: {
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        openId: that.globalData.openId,
      },
      success: (response) => {
        console.log('请求成功  getWorldRankingList statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          console.log(response.data);
        }
      },
      fail: function(err) {
        console.log('请求 LevelRule 失败', err);
      }
    });
  },
  getRankingList: function(id) {
    var that = this;
    qcloud.request({
      url: config.service.getRankingList,
      header: {
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        openId: that.globalData.openId,
        typeId: id,
      },
      success: (response) => {
        console.log('请求成功 statusCode:' + response.statusCode);
        if (response.statusCode == 0) {
          console.log(response);
        }
      },
      fail: function(err) {
        console.log('请求 LevelRule 失败', err);
      }
    });
  },
  getNextLevelScoreGap: function(score, level) {
    // if (this.globalData.rule != null && this.globalData.rule.length > 0) {
    //   for (var i = 0; i < this.globalData.rule.length; i++) {
    //     var levels = this.globalData.rule[i];
    //     for (var j = 0; j < levels.levels.length; j++) {
    //       var data = levels.levels[j];
    //       if (level == data.level) {
    //         return data.score - score;
    //       }
    //     }
    //   }
    // }
    // return 1;
    console.log('getNextLevelScoreGap score:' + score + ' level:' + level);
    return this.getLevelMaxScore(level) + this.getLevelMaxScore(level + 1) - score;
  },
  getLevelMaxScore:function(level) {
    if (this.globalData.rule != null && this.globalData.rule.length > 0) {
      for (var i = 0; i < this.globalData.rule.length; i++) {
        var levels = this.globalData.rule[i];
        for (var j = 0; j < levels.levels.length; j++) {
          var data = levels.levels[j];
          if (level == data.level) {
            console.log('getLevelMaxScore level:'+level+' score:'+data.score);
            return data.score;
          }
        }
      }
    }
    
    return 1;
  },
  scoreConvertLevel: function(score) {
    console.log('scoreConvertLevel==> score:' + score);
    var level = 1;
    if (this.globalData.rule != null && this.globalData.rule.length > 0) {
      for (var i = 0; i < this.globalData.rule.length; i++) {
        var levels = this.globalData.rule[i];
        for (var j = 0; j < levels.levels.length; j++) {
          var data = levels.levels[j];
          if (score <= data.score) {
             level = data.level - 1;
             if (level <= 0) level = 1;
             return level;
          }
        }
      }
    }

    return level;
  },
  addChallengeCnt: function(num) {
    this.globalData.achievementDetail.totalChallenge += num;
    console.log('update achievementDetail:' + this.globalData.achievementDetail.totalChallenge);
  },

  updateWinningStreak: function(num) {
    if (this.globalData.achievementDetail.winningStreak < num)
      this.globalData.achievementDetail.winningStreak = num;
  },

  updateMaxScore: function(score) {
    console.log('updateMaxScore score:'+score);
    if (this.globalData.achievementDetail.maxScore < score)
      this.globalData.achievementDetail.maxScore = score;

    if (score > 0) {
      this.globalData.totalScore += score;
      if (this.globalData.updateScoreInfoCallBack != null) {
        this.globalData.updateScoreInfoCallBack(this.globalData.scoreInfo);
      }
    }
  },
  addTotalInvitation: function(num) {
    console.log(this.globalData.achievementDetail.totalInvitation);
    this.globalData.achievementDetail.totalInvitation += num;
    console.log(this.globalData.achievementDetail.totalInvitation);
  },
  addInvitationWin: function(num) {
    return this.globalData.achievementDetail.invitationWin += num;
  },
  updateInvitationWinRate: function() {
    this.globalData.achievementDetail.invitationWinRate = (this.globalData.achievementDetail.invitationWin * 100 / this.globalData.achievementDetail.totalInvitation)
  },
  saveDataToStorage: function() {
    console.log('save achievementDetail:');
    console.log(this.globalData.achievementDetail);
    wx.setStorage({
      key: 'achievementDetail',
      data: this.globalData.achievementDetail,
    });
  },
  getDataFromStorage: function() {
    var that = this;
    wx.getStorage({
      key: 'achievementDetail',
      success: function(res) {
        console.log("获取 achievementDetail 数据成功:");
        console.log(res.data);
        that.globalData.achievementDetail = res.data;
      },
      fail: function(res) {
        console.log("获取 achievementDetail 数据失败");
      }
    });
    /*
    var data = wx.getStorageSync('achievementDetail');
    console.log('data:');
    console.log(data);
    if(!data){
      console.log('set achievementDetail');
      //this.globalData.achievementDetail = data;
    }
    console.log('get achievementDetail:');
    console.log(this.globalData.achievementDetail);
    */
  },
  setUpdateRankingCallBack: function(cb) {
    if (typeof cb == "function") {
      this.globalData.updateScoreInfoCallBack = cb;
    } else {
      console.log(' setUpdateRankingCallBack param is unvalid!')
    }
  },
  uploadScoreInfo: function(id, score) {
    var that = this;
    console.log('uploadScoreInfo id:' + id + ', score:' + score);
    qcloud.request({
      url: config.service.updateScoreInfo,
      header: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      data: { //这里写你要请求的参数
        openId: that.globalData.openId,
        total_score: that.globalData.totalScore,
        category_id: id,
        current_score: score,
        user_experience: 10,
        victorynum: that.globalData.scoreInfo.victorynum,
      },
      success: (response) => {
        console.log('上传 uploadScoreInfo 成功 statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          console.log(response.data.data);
          console.log(response.data.code);
        }
      },
      fail: function(err) {
        console.log('请求 uploadScoreInfo 失败', err);
      }
    });
  },

  getCategory: function() {
    console.log("getCategory");
    var that = this;
    qcloud.request({
      url: config.service.requestCategory,
      login: false,
      header: {
        'Content-Type': 'application/json'
      },
      success: (response) => {
        console.log('请求挑战类别成功 statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          that.globalData.categoryTree = response.data.data;
        }
        console.log(that.globalData.categoryTree);
      },
      fail: function(err) {
        console.log('请求挑战类别失败', err);
      } 
    });
  
    qcloud.request({
      url: config.service.requestStudyCategory,
      login: false,
      header: {
        'Content-Type': 'application/json'
      },
      success: (response) => {
        console.log('请求学习类别成功 statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          that.globalData.categoryStudyTree = response.data.data;
        }
        console.log(that.globalData.categoryStudyTree);
      },
      fail: function(err) {
        console.log('请求学习类别失败', err);
      }
    });

    qcloud.request({
      url: config.service.requestPKCategory,
      login: false,
      header: {
        'Content-Type': 'application/json'
      },
      success: (response) => {
        console.log('请求对战类别成功 statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          that.globalData.categoryPKTree = response.data.data;
        }
        console.log(that.globalData.categoryPKTree);
      },
      fail: function (err) {
        console.log('请求对战类别失败', err);
      }
    });
  }, 
  
  addShareTargeOpenGId: function (TYPE, openGid) {
    for (var i in this.globalData.openGids){
      if (openGid == this.globalData.openGids[i]){
        console.log('has exist gid:' + openGid)
        console.log(openGid)
        return false;
      }
    }
    wx.showToast({
      title: '获得100经验值',
    })
    this.globalData.totalScore += 100;
    if (this.globalData.updateScoreInfoCallBack != null) {
      this.globalData.updateScoreInfoCallBack(this.globalData.scoreInfo);
    }
    console.log('addShareTargeOpenGId:' + openGid)
    this.globalData.openGids.push(openGid);
    wx.setStorage({
      key: 'openGids',
      data: this.globalData.openGids,
    });
    return true;
  },
  getShareTargeOpenGId:function(){
    var that = this;
    wx.getStorage({
      key: 'openGids',
      success: function (res) {
        console.log("获取 openGids 数据成功:");
        console.log(res.data);
        that.globalData.openGids = res.data;
        console.log(that.globalData.openGids);
      },
      fail: function (res) {
        console.log("获取 openGids 数据失败");
      }
    });
  },
  getShareTicket: function (res) {
    var that = this;
    wx.getSystemInfo({
      success: function (d) {
        console.log('data:');
        console.log(d);
        //判断用户手机是IOS还是Android
        if (d.platform == 'android') {
          wx.getShareInfo({//获取群详细信息
            shareTicket: res.shareTickets,
            success: function (res) {
              console.log('shareTickets:');
              console.log(res);
              that.getOpenGId(res);
            },
            fail: function (res) {//这个方法就是分享到的是好友，给一个提示
              console.log('fail shareTickets:');
              console.log(res);
            }
          })
        } else if (d.platform == 'ios') {//如果用户的设备是IOS
          if (res.shareTickets != undefined) {
            console.log("分享的是群");
            wx.getShareInfo({
              shareTicket: res.shareTickets,
              success: function (res) {
                //分享到群之后你要做的事情
                that.getOpenGId(res);
              }
            })
          } else {//分享到个人要做的事情，我给的是一个提示
            console.log("分享的是个人");
            /*wx.showModal({
              title: '提示',
              content: '分享好友无效，请分享群',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })*/
          }
        } else {
          wx.getShareInfo({//获取群详细信息
            shareTicket: res.shareTickets,
            success: function (res) {
              console.log('shareTickets:');
              console.log(res);
              var iv = res.iv
              console.log('openId:')
              console.log("" + that.globalData.openId)

              console.log(JSON.stringify(res.encryptedData))
              that.getOpenGId(res);
            },
            fail: function (res) {//这个方法就是分享到的是好友，给一个提示
              console.log('fail shareTickets:');
              console.log(res);
              /*
              wx.showModal({
                title: '提示',
                content: '分享好友无效，请分享群',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })*/
            }
          })
        }
      },
      fail: function (res) {
      }
    })
  },
  getOpenGId: function (res) {
    var that = this;
    console.log('openId:')
    console.log("" + that.globalData.openId)
    wx.request({
      url: config.service.getGID,
      data: {
        encryptedData: res.encryptedData,
        iv: JSON.stringify(res.iv),
        appId: 'wx7cf81d27e6c79640',
        openId: that.globalData.openId,
      },
      success: function (res) {
        console.log(res.data)
        var openGId = res.data.data.openGId
        var ret = that.addShareTargeOpenGId(0, openGId);
        if(ret){
          that.uploadScoreInfo(24, 0);
        }
      },
      fail: function (res) {
        console.log('fail get user OpenGid!!!');
        console.log(res);
      }
    })
  },
  /*
  saveContinueWinToStorage: function (total) {
    console.log('save achievementDetail:'+total);
    this.globalData.continueWinCount = total;
    wx.setStorage({
      key: 'continueWinCount',
      data: total,
    });
  },
  getContinueWinFromStorage: function () {
    var that = this;
    wx.getStorage({
      key: 'continueWinCount',
      success: function (res) {
        console.log("获取 continueWin 数据成功:");
        console.log(res.data);
        that.globalData.continueWinCount = res.data;
      },
      fail: function (res) {
        console.log("获取 continueWin 数据失败");
      }
    });
  },*/
})