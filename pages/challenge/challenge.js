//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');

var treedataDebug = [{
  'id': 11,
  'title': '11111前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局',
  'answers': [{
    'answer': '回到网页开发去了前段时间小程序上线后就弃坑了,回到网页开了前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局',
    'id': 0,
  }, {
    'answer': '最近又有新项目,再次入坑,难免需要一些dem重新dsdsassddasdsa前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局',
    'id': 1,
  }, {
    'answer': '回到网页开发去了在这个过,发现demo中很少有人使用flex布局前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局',
    'id': 2,
  }, {
    'answer': '发现demo少有人使用flex布局123323223,回到网页开发去了前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局',
    'id': 3,
  }],
  'answer': 3,
  'score': 10,
  'timer': 10,
  'type': 1,
  'index': 999,
}, {
  'id': 13,
  'title': '22222222前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局',
  'title2': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
  'answers': [{
    'answer': '回到网页开发去了前段时上线后就弃坑了,回到网页开发去了',
    'id': 0,
  }, {
    'answer': '最近又有新项目,再次入坑,要一些demo来重新dsdsassddasdsa',
    'id': 1,
  }, {
    'answer': '回到网页开发去了在中,发现demo中很少有人使用flex布局',
    'id': 2,
  }, {
    'answer': '回到网页开发时间小程序上线后就弃坑了,回到网页开发去了',
    'id': 3,
  }],
  'score': 10,
  'timer': 10,
  'answer': 2,
  'type': 2,
  'index': 1001,
}, {
  'id': 14,
  'title': '33333333前段时间小程序上线后就弃坑了,回到网页开发去了,最近又有新项目,再次入坑,难免需要一些demo来重新熟悉,在这个过程中,发现demo中很少有人使用flex布局',
  'title2': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
  'answers': [{
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 0,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 1,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 2,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 3,
  }],
  'answers_img': [{
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 0,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 1,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 2,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 3,
  }],
  'answer': 1,
  'score': 10,
  'timer': 1000,
  'type': 3,
  'index': 1002,
}, {
  'id': 15,
  'title': '44444接天莲叶无穷尽下一句是',
  'answers': [{
    'answer': '毕竟西湖六月中',
    'id': 0,
  }, {
    'answer': '风光不与四十同',
    'id': 1,
  }, {
    'answer': '映日荷花别样红',
    'id': 2,
  }, {
    'answer': '故人西辞黄鹤楼',
    'id': 3,
  }],
  'answer': 2,
  'score': 10,
  'timer': 10,
  'type': 4,
  'index': 1003,
}, {
  'id': 16,
  'title': '5555555银河系的恒星大约四分之一是双星,某双星由质量不等的S2和S1构成,两星由两者万有引力下构成,某一圆点做运转运动银河系的恒星大约四分之一是双星,某双星由质量不等的S2和S1构成,两星由两者万有引力下构成,某一圆点做运转运动银河系的恒星大约四分之一是双星,某双星由质量不等的S2和S1构成,两星由两者万有引力下构成,某一圆点做运转运',
  'title2': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
  'answers': [{
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 0,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 1,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 2,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 3,
  }],
  'answers_img': [{
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 0,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 1,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 2,
  }, {
    'answer': 'http://img6.bdstatic.com/img/image/smallpic/PPT1215.jpg',
    'id': 3,
  }],
  'answer': 1,
  'score': 10,
  'timer': 10,
  'type': 5,
  'index': 1004,
}];

Page({
  data: { 
    ID:-1,
    PAGE:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    empirical:999,
    ranking:0,
    progress:99,
    Height:150,
    empiricalV:1,
    levelV:1,
    score:13242,
    score1:0,
    typeScore:0,
    answer:[],
    question:[],
    answerid:[],
    character:[],
    type3imagesW:300,
    type3imagesH:200,
    levelNum:9999,
    showFragment:1,
    curIndex:0,
    oldLevel:0,
    upgradeDialog:false,
    showModal:false,
    pendEvent:false,
    redCnt:5,
    gameOver:false,
    timer:null,
    pendindDuration: 1000,
    answerIndex:-1,
    allowShareMax: 2,
    curShareTick:0,
    characterBgColor:[],
    hearts:[],
    continueRight:0,
    continueMaxRight:0,
    errorCateoryList:[],
    questionTotal:30,
    questionIndex:0,
    showLoading:false,
    levelRules: [{
      'title': '新手',
      'levels': [{
        'level': 1,
        'score': 0,
      }, {
        'level': 2,
        'score': 900,
      }, {
          'level': 3,
          'score': 150,
      }, {
        'level': 4,
        'score': 1900,
      }, {
        'level': 5,
        'score': 2300,
      }],
    }, {
      'title': '熟手',
      'levels': [{
        'level': 6,
        'score': 3900,
      }, {
        'level': 7,
        'score': 4800,
      }, {
        'level': 8,
        'score': 5700,
      }, {
        'level': 9,
        'score': 6600,
      }, {
        'level': 10,
        'score': 7500,
      }],
      }, {
        'title': '黑铁',
        'levels': [{
          'level': 11,
          'score': 830,
        }, {
          'level': 12,
          'score': 9300,
        }, {
          'level': 13,
          'score': 11400,
        }, {
          'level': 14,
          'score': 13800,
        }, {
          'level': 15,
          'score': 16500,
        }],
    }, {
      'title': '青铜',
      'levels': [{
        'level': 16,
        'score': 19500,
      }, {
        'level': 17,
        'score': 22800,
      }, {
        'level': 18,
        'score': 26400,
      }, {
        'level': 19,
        'score': 30300,
      }, {
        'level': 20,
        'score': 34500,
      }]
      }],
    tree:"",
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    this.data.ID = option.id;
    console.log(' get select id:'+this.data.ID)
    console.log(' get app.globalData.userInfo:' + app.globalData.userInfo)
    this.setData({
      // score: app.globalData.totalScore,
      score: 0,
      oldLevel:app.scoreConvertLevel(app.globalData.totalScore),
      userInfo: app.globalData.userInfo,
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#735cd9',
    });
    wx.setNavigationBarTitle({
      title: "实战模拟"
    })
    this.requestQuestionList(this.data.PAGE, this.data.ID);
  },
  getUserInfo: function(e) {
    console.log(' getUserInfo')
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  requestQuestionList: function (page, id) {
    var that = this;
    this.setData({
      showLoading: true
    })
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
        that.setData({
          showLoading: false
        })       
        that.data.tree = response.data.data;
       
        if (that.data.tree == null || that.data.tree.length == 0){
          this.setData({
            gameOver: true,             
            showFragment:0,
          });
          this.cancelTimer();
          this.saveCacheData();
          this.showUpgradeDialog();
        }else{
          if(that.data.PAGE == 0){
            that.initData();
          }else{
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
  initData:function(){
    this.initHearts(this.data.redCnt);
    this.setData({
      ranking: 0,
      levelV:this.data.level+"级",
      score: this.data.score,
    });

    this.initQuestionAndAnswer(this.data.curIndex);
  },

  initHearts:function(redCnt){
    this.data.hearts = [];
    for(var i=0; i< 5; i++){
      if(i <redCnt){
        this.data.hearts.push('../../images/ic_heart.png');
      }else{
        this.data.hearts.push('../../images/ic_heart_fail.png');
      }
    }
    this.setData({
      hearts: this.data.hearts,
    });
  },
  initQuestionAndAnswer(index){
    this.data.pendEvent = false;

    this.data.answer = [];
    this.data.question = [];
    this.data.answerid =[];
    this.data.characterBgColor = [];
    this.data.character=[];
    var section = this.data.tree[index];
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
      answerIndex:-1,
      progress:100,
      empiricalV: "第" + section.index + "题",
      characterBgColor: this.data.characterBgColor,
      character: this.data.character,
      questionIndex: this.data.questionIndex,
    })
    this.data.questionIndex ++;
    this.startCountDown(section.timer*10);
    app.addChallengeCnt(1);
  },
  showModal:function(){
    var that = this;
    this.cancelTimer();
    this.saveCacheData();
    setTimeout(function () {
      that.data.pendEvent = false;
      if (that.data.curShareTick >= that.data.allowShareMax){
        that.showChallengeResult(true);
      }else{
        that.setData({
          showModal: true,
        })
      }
    }, this.data.pendindDuration);
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

  checkAnswer:function(id){
    var question = this.data.tree[this.data.curIndex];
    if (question.answer == id)
      return true;
    else
      return false;
  },

  showAnswer:function(id){
    var section = this.data.tree[this.data.curIndex];
    var ret = this.checkAnswer(id);
    console.log(' showAnswer:' + id + ' ret is:' + ret);    

    if (ret) {
      this.data.characterBgColor[id] = '#9be665';
      this.data.continueRight++;

      var score = parseInt(this.data.progress / 10) * 2;
      if (score <= 0)
        score = 1;
      console.log(' score:' + score);    

      this.data.score += score;
      this.data.score1 += score;
      this.data.character[id] = '../../images/ic_aws_right.png';
    } else {
      app.updateWinningStreak(this.data.continueRight);
      if (this.data.continueRight > this.data.continueMaxRight){
        this.setData({
          continueMaxRight: this.data.continueRight,
        })
      }
      this.data.errorCateoryList.push(section);
      console.log('errorCateoryList:')
      console.log(this.data.errorCateoryList)
      this.data.continueRight = 0;
      this.data.characterBgColor[section.answer] = '#9be665';
      this.data.character[section.answer] = '../../images/ic_aws_right.png';
      if(id >= 0){
        this.data.characterBgColor[id] = '#F76F40';
        this.data.character[id] = '../../images/ic_aws_error.png';
      }
      this.initHearts(--this.data.redCnt);
    }
    var index = parseInt(section.answer) + 1;
    this.setData({
      score: this.data.score,
      characterBgColor: this.data.characterBgColor,
      character: this.data.character,
      answerIndex: index,
    });
    wx.setStorage({
      key: 'totalScore',
      data: this.data.score,
    });
  },
  onClickAnswer:function(e){
    if (this.data.pendEvent){
      console.log(' pendEvent !!!');
      return;
    }
    console.log(' call cancelTimer');
    this.cancelTimer();
    console.log(' call showAnswer');
    this.showAnswer(e.target.id);
    console.log(' this.data.tree.length:');
    this.data.pendEvent = true;
    if (this.data.redCnt > 0) {
      this.loadNext(this.data.pendindDuration);
    } else {
      this.showModal();
    }
  },
  loadNext:function(delay){
    if (this.showChallengeResult(false))
      return;

    if (this.data.curIndex >= this.data.tree.length - 1) {
      this.data.curIndex = 0;
      this.requestQuestionList(++this.data.PAGE, this.data.ID);
    } else {
      var that = this;
      setTimeout(function () {
        that.initQuestionAndAnswer(++that.data.curIndex);
      }, delay);
    }
  },


  onClickCloseModal:function(){
    console.log(' onClickCloseModal !');
    this.showChallengeResult(true);
  },

  showChallengeResult:function(force){
    if (force || this.data.questionIndex >= this.data.questionTotal){
      this.data.pendEvent = true;
      var that = this;
      this.cancelTimer();
      var delay = force ? 100 : this.data.pendindDuration;
      setTimeout(function () {
        that.setData({
          showModal: false,
          gameOver: true,
          showFragment: 0,
        })
        that.saveCacheData();
        that.showUpgradeDialog();
      }, delay);
      return true;
    }else{
      return false;
    }
  },

  showUpgradeDialog:function(){
    var newLevel = app.scoreConvertLevel(app.globalData.totalScore);
    if (this.data.oldLevel < newLevel){
      this.setData({
        newLevel: newLevel,
        upgradeDialog: true,
        oldLevel:newLevel,
      })
    }
  },
  startCountDown:function(duration){
    var that = this;
    this.cancelTimer();
    if (that.data.progress > 0){
      that.data.timer = setTimeout(function () {
        that.data.timer = null;
        that.setData({
          progress : that.data.progress - 1
        })
        that.startCountDown(duration);
      }, duration);
    }else{
      this.showAnswer(-1);
      this.data.pendEvent = true;
      if (this.data.redCnt > 0){
        this.loadNext(this.data.pendindDuration);
      }else{
        this.showModal();
      }
    }
  },

  drawRuleText: function (ctx, x, y, cnt) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.setFontSize(20);
    ctx.setFillStyle('#e853b8');
    ctx.setTextAlign('center');
    ctx.fillText(cnt, x, y);
  },
  
  drawCirque: function (ctx, x, y) {
    ctx.beginPath();
    ctx.setStrokeStyle('#eec700');
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.stroke()
  },
  drawCircle: function (ctx, x, y) {
    ctx.beginPath();
    ctx.setFillStyle('#eec700');
    ctx.arc(x, y, 40, 0, 2 * Math.PI);
    ctx.fill()
  },
  onClickSelf:function(){
    wx.navigateTo({
      url: '../select/select' + '?lockLevel=' + (5) + '&maxLevel=' + 5
    })
  },

  onClickAgain: function () {
    console.log(' onClickAgain !!!');
    this.reLoadData();
  },
  onClickUpgradeOk:function(){
    this.setData({
      upgradeDialog: false,
    })   
  },

  cancelTimer:function(){
    if (this.data.timer != null) {   
      console.log(' clearTimeout at first !!!');
      clearTimeout(this.data.timer);
      this.data.timer = null;
    }
  },

  saveCacheData:function(){
    console.log('saveCacheData score1:' + this.data.score1 + ' score:' + this.data.score);

    if (this.data.score1 > 0) {
      app.updateMaxScore(this.data.score1);   
      app.uploadScoreInfo(this.data.ID, this.data.score1);
      this.data.score1 = 0;   
    }

    if (this.data.continueRight > 0) {
      app.updateWinningStreak(this.data.continueRight);
      if (this.data.continueRight > this.data.continueMaxRight) {
        this.setData({
          continueMaxRight: this.data.continueRight,
        })
      }
      this.data.continueRight = 0;
    }
    app.saveDataToStorage();
  },

  onHide: function () {
    console.log(' onHide!!!');
    this.cancelTimer();
    this.saveCacheData();
  },
  onUnload: function () {
    console.log("==onUnload==");
    this.cancelTimer();
    this.saveCacheData();
    if (!this.data.gameOver && !this.data.showModal){
      app.globalData.abortExit = true;
    }
  },
  onShareAppMessage: function (ops) {
    var that = this;
    if (ops.from == 'button') {
      console.log('share target id:' + ops.target.id);

      return {
        title: '[有人@我]免费全面的考题等你挑战',
        path: 'pages/home/home',
        imageUrl: 'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/share/share_invite_logo.png',
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          app.getShareTicket(res)

          if (ops.target.id != 'share_gameover') {
            that.reLoadData();
          }
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    } else {
      return {
        title: '[有人@我]免费全面的考题等你挑战',
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
  reLoadData:function(){
    if (this.data.gameOver){
      this.setData({
        gameOver: false,
        questionIndex: 0,
        continueMaxRight:0,
        curShareTick:0,
      })
      this.data.PAGE = 0;
      this.data.redCnt = 5;  
      this.data.curIndex = 0;
      this.requestQuestionList(this.data.PAGE, this.data.ID);    
    }else if (this.data.showModal) {
      this.data.curShareTick += 1;
      this.retryAgain();   
    }
  },
   
  retryAgain:function(){
    this.data.redCnt = 5;
    this.initHearts(this.data.redCnt);
    this.setData({
      showModal: false,   
    });
    this.data.pendEvent = false;
    this.loadNext(200);
  },
})
