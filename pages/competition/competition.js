//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var tunnelClass = require('../../tunnel');
Page({
  data: {
    userInfo: {},
    userInfo1:{
      nickName:'Rose',
      avatarUrl:'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/challenge/ic_crown.png',
      score:100,
      selectAnswer:1,
    },
    empirical:999,
    ranking:0,
    progress:99,
    Height:150,
    empiricalV:0,
    selfScore:0,
    friendScore: 0,
    levelV:0,
    score:13242,
    PAGE:0,
    ID:24,
    scoreStr:null,
    score1: 0,
    typeScore: 0,
    answer: [],
    question: [],
    answerid: [],
    character: [],    
    showModal:false,
    showFailed:false,
    levelNum: 9999,
    showFragment: 1,
    curIndex: 0,
    oldLevel: 0,
    upgradeDialog: false,
    showModal: false,
    pendEvent: false,
    redCnt: 5,
    gameOver: false,
    timer: null,
    categoryID: -1,
    frompageID: -1,
    pendindDuration: 1000,
    allowShareMax: 2,
    curShareTick: 0,
    characterBgColor: [],
    hearts: [],
    continueRight: 0,
    continueRight2:0,
    continue1:0,
    continue2:0,
    continueWin1:0,
    continueWin2: 0,
    questionTotal: 5,
    questionIndex: 0,
    showLoading: false,
    userInfo1Score:0,
    userInfo2Score:0,
    userInfo1Answer: 0,
    runawayNotice:false,
    continueWin:0,
    pkResultImage:"/images/pk_success.png",
    type1: [{
      'id': 11,
      'title': '前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局',
      'answer1': ',回到网页开发去了前段时间小程序上线后就弃坑了,回到网页开发去了',
      'answer2': '最近又有新项目,再次入坑,难免需要一些demo来重新dsdsassddasdsa',
      'answer3': '回到网页开发去了在这个过程中,发现demo中很少有人使用flex布局',
      'answer4': '回到网页开发去了在这个过程中,发现demo中很少有人使用flex布局123323223',
      'answer':3
    }],
    type2: [{
      'id': 12,
      'title': '接天莲叶无穷尽下一句是?',
      'answer1': '毕竟西湖六月中',
      'answer2': '风光不与四十同',
      'answer3': '映日荷花别样红',
      'answer4': '故人西辞黄鹤楼',
      'answer':1,
    }],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userInfo1: app.globalData.userInfo1,
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#b382dd',
    });
    wx.setNavigationBarTitle({
      title: "好友对战"
    })
    //this.requestQuestionList(this.data.PAGE, this.data.ID);
    this.data.tree = app.globalData.question;
    this.data.continueWin1 = app.globalData.continueWinCount;
    this.data.categoryID = option.id;
    this.data.frompageID = option.frompageid;
    console.log('tree:');
    console.log(this.data.tree);
    tunnelClass.setListenQuestion(this.onHandleQuestion)
    //tunnelClass.listenQuestion(null);
    tunnelClass.listenGetAnswer(this.onHandleGetAnswer);
    tunnelClass.listenRunawayNotice(this.onHandleRunawayNotice)
    this.initQuestionAndAnswer(this.data.curIndex);
  },

  cancelTimer: function () {
    if (this.data.timer != null) {
      console.log(' clearTimeout at first !!!');
      clearTimeout(this.data.timer);
      this.data.timer = null;
    }
  },

  initData:function(){    
    this.setData({
      empirical: 999,
      ranking: 0,
      empiricalV: "第" + this.data.empirical +"题",
      levelV:this.data.level+"级",
      scoreStr: this.data.score+'分',
      answer: this.data.answer,
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#735cd9',
    });
    wx.setNavigationBarTitle({
      title: "对战"
    })
    //this.requestQuestionList(this.data.PAGE, this.data.ID);
    this.initQuestionAndAnswer(this.data.showFragment);
  },
  requestQuestionList: function (page, id) {
    var that = this;
    qcloud.request({
      url: config.service.requestQuestionList,
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        category_id: id,
        page_index: page
      },
      success: (response) => {
        console.log('请求成功 statusCode:' + response.statusCode);
        console.log(response.data.data);
        that.data.tree = response.data.data;

        if (that.data.tree == null || that.data.tree.length == 0) {
          this.setData({
            gameOver: true,
            showFragment: 0,
          });
          this.cancelTimer();
          //this.saveCacheData();
          //this.showUpgradeDialog();
        } else {
          if (that.data.PAGE == 0) {
            that.initData();
          } else {
            that.initQuestionAndAnswer(that.data.curIndex);
          }
        }
        console.log(that.data.tree);
      },
      fail: function (err) {
        console.log('请求失败', err);
      }
    });
  },

  initQuestionAndAnswer(index) {
    this.data.answer = [];
    this.data.question = [];
    this.data.answerid = [];
    this.data.characterBgColor = [];
    this.data.character = [];
    var section = this.data.tree;
    console.log(' section ' + index + ' data::');
    console.log(this.data.tree);
    var type = section.type;

    this.data.character.push('../../images/ic_a.png');
    this.data.character.push('../../images/ic_b.png');
    this.data.character.push('../../images/ic_c.png');
    this.data.character.push('../../images/ic_d.png');
    console.log(' section ' + index + ' data.type:' + section.type);
    this.setData({
      answer: this.data.answer,
      question: section,
      answerid: this.data.answerid,
      showFragment: type,
      progress: 100,
      empiricalV: "第" + section.index + "题",
      characterBgColor: this.data.characterBgColor,
      character: this.data.character,
      questionIndex: this.data.questionIndex,
    })
    this.data.questionIndex++;
    this.data.pendEvent = false;
    this.startCountDown(section.timer*10);
    //app.addChallengeCnt(1);
  },

  onClickContext:function(){
    this.setData({
      showModal: !this.data.showModal
    })
  },

  onCancel: function () {
    this.setData({
      showModal: !this.data.showModal
    })
  },

  onConfirm: function () {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  preventTouchMove: function () {
    console.log(' preventTouchMove !');
  },

  onClickAnswer:function(e){
    console.log(' onClickAnswer:' + e.target.id);
    if (this.data.pendEvent){
      console.log(' pendingEvent !!!');
      return;
    }
    this.data.pendEvent = true;  
    this.cancelTimer();
    if (this.data.runawayNotice) {
      console.log(' call runawayNotice !');
      return ;
    }    
    console.log(' call showAnswer');
    this.showAnswer(e.target.id);
    console.log(' this.data.tree.length:');
  },


  checkAnswer: function (id) {
    var question = this.data.tree;
    if (question.answer == id)
      return true;
    else
      return false;
  },

  updateAnswerBgOnly(answer, self){
    var ret = false;
    if (answer >= 0){
      ret = this.checkAnswer(answer);
      console.log(' showAnswer:' + answer + ' ret is:' + ret);
      if (ret) {
        this.data.characterBgColor[answer] = '#9be665';
        this.data.character[answer] = '../../images/ic_aws_right.png';
      } else {
        if (answer >= 0) {
          this.data.characterBgColor[answer] = self ? '#F76F40':'#101661';
          this.data.character[answer] = '../../images/ic_aws_error.png';
        }
      }
    }
    return ret;
  },

  showAnswer: function (id) {
    var section = this.data.tree;
    var ret = this.updateAnswerBgOnly(id, true);
    if(ret){
      this.data.continue1++;
      this.data.userInfo1Score += 100;
    }else{
      if (this.data.continueRight < this.data.continue1) {
        this.data.continueRight = this.data.continue1;
      }
      this.data.continue1 = 0;
    }

    this.setData({
      characterBgColor: this.data.characterBgColor,
      character: this.data.character,
      userInfo1Score: this.data.userInfo1Score
    });
    var that = this;
    tunnelClass.uploadAnswer(id, that.data.userInfo1Score);
  },
  showRunaway: function (str) {
    wx.showToast({
      title: str,
    })
  },
  onClickCloseModal:function(){
    console.log(' onClickCloseModal !');
    this.setData({
      showModal: !this.data.showModal
    })    
  },
  startCountDown:function(duration){
    var that = this;
    if (that.data.progress > 0){
      this.data.timer = setTimeout(function () {
        that.setData({
          progress : that.data.progress - 1
        })
        that.startCountDown(duration);
      }, duration);
    }else{
      this.showAnswer(-1);
    }
  },

  onHandleQuestion: function (res) {
    console.log('enter onHandleQuestion!')
    console.log(res)
    
    var choicePlayer2 = res.choicePlayer1[0] == app.globalData.openId ? res.choicePlayer2 : res.choicePlayer1;
    var ret = this.updateAnswerBgOnly(choicePlayer2[1], false);
    if (ret) {
      this.data.continue2 ++;
      this.data.userInfo2Score += 100;
    }else{
      if(this.data.continueRight2 < this.data.continue2){
        this.data.continueRight2 = this.data.continue2;
      }
      this.data.continue2 = 0;
    }
    if (choicePlayer2[1] != this.data.tree.answer){
      this.updateAnswerBgOnly(this.data.tree.answer, false);
    }
    var index = parseInt(choicePlayer2[1]) + 1;
    this.setData({
      characterBgColor: this.data.characterBgColor,
      character: this.data.character,
      answerIndex: index,
      userInfo2Score: this.data.userInfo2Score,
      userInfo1Answer: choicePlayer2[1],
    });

    if ("title" in res.question) {
      this.data.tree = res.question;
      var that = this;
      setTimeout(function () {
        console.log(' runawayNotice:' + that.data.runawayNotice)
        if (!that.data.runawayNotice) {
          that.initQuestionAndAnswer(that.data.curIndex);
        }
      }, 2000);
    }else{
      tunnelClass.fightingResult(true);
      this.stopPK();
    }
  },
  stopPK:function(){
    this.cancelTimer();
    var that = this
    console.log(' userInfo:' + that.data.userInfo1Score)
    console.log(' userInfo1:' + that.data.userInfo2Score)
    var pkImage = that.data.userInfo1Score > that.data.userInfo2Score ? '/images/pk_success.png' : '/images/pk_failed.png';
    if (that.data.userInfo1Score > that.data.userInfo2Score){
      this.data.continueWin1 += 1;
      app.saveContinueWinToStorage(this.data.continueWin1);
    }else{
      this.data.continueWin2 += 1;
      this.data.continueWin1 = 0;
      app.saveContinueWinToStorage(0);
    }

    if (this.data.continueRight2 < this.data.continue2) {
      this.data.continueRight2 = this.data.continue2;
    }
    if (this.data.continueRight < this.data.continue1) {
      this.data.continueRight = this.data.continue1;
    }
    setTimeout(function () {
      that.setData({
        showFailed: !that.data.showFailed,
        showFragment: -1,
        continueRight: that.data.continueRight,
        continueRight2: that.data.continueRight2,
        pkResultImage: pkImage,
        continueWin1: that.data.continueWin1,
        continueWin2: that.data.continueWin2,
      })
    }, 1000);
    tunnelClass.closeTunnel();
    app.updateMaxScore(this.data.userInfo1Score);
    app.uploadScoreInfo(this.data.categoryID, this.data.userInfo1Score);
  },

  onHandleGetAnswer:function(res){
    console.log('enter onHandleGetAnswer!')
    console.log(res)
  },

  onHandleRunawayNotice:function(res){
    console.log('enter onHandleRunawayNotice!')
    console.log(res)
    this.data.runawayNotice = true;
    this.stopPK();
    this.showRunaway('对方已逃跑')
  },

  onClickAgain: function () {
    console.log(' onClickAgain !!! ID:' + this.data.categoryID);

    wx.redirectTo({
      url: '../invitation/invitation?id=' + this.data.categoryID + '&frompageid=' + this.data.frompageID,
    })
  },
  onUnload:function(){
    console.log('onUnload!!!')
    this.cancelTimer();
    tunnelClass.closeTunnel();
  },
  onShareAppMessage: function (ops) {
    var that = this;
    if (ops.from == 'button') {
      return {
        title: '[有人@我]来试试好玩的单词学习工具吧！',
        path: 'pages/home/home',
        imageUrl: 'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/share/share_invite_logo.png',
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          app.getShareTicket(res)
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    } else {
      return {
        title: '[有人@我]来试试好玩的单词学习工具吧！',
        path: 'pages/home/home',
        imageUrl: 'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/share/share_invite_logo.png',
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    }
  },
})
