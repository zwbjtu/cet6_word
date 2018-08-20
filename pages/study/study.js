//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var DEBUG = false;

var touchDown = 0;//触摸时的原点  
var touchUp = 0;
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动  
var intervalId = "";// 记录/清理时间记录  

var datatreeDebug = [{
  'id': 10,
  'title': '请描述一下Activity 生命周期',
  'answers': [],
  'answer': '共有七个周期函数，按顺序分别是: onCreate(), onStart(), onRestart(), onResume(), onPause(),onStop(), onDestroy()。 \r\n onCreate(): 创建Activity时调用，设置在该方法中，还以Bundle的形式提供对以前存储的任何状态的访问。 \n onStart(): Activity变为在屏幕上对用户可见时调用。 onResume(): Activity开始与用户交互时调用(无论是启动还是重新启动一个活动，该方法总是被调用。 \n onPause(): Activity被暂停或收回cpu和其他资源时调用，该方法用户保护活动状态的，也是保护现场。 \n onStop(): Activity被停止并转为不可见阶段及后续的生命周期事件时调用。 \n onRestart(): Activity被重新启动时调用。该活动仍然在栈中，而不是启动新的Activity。 1. 完整生命周期: 即从一个Activity从出现到消失，对应的周期方法是从onCreate()到onDestroy() 。2. 可见生命周期: 当Activity处于可以用户看见的状态，但不一定能与用户交互时，将多次执行从onStart()到onStop() 。3. 前景生命周期: 当Activity处于Activity栈最顶端，能够与其他用户进行交互时，将多次执行从onResume()到onPause() 。',
  'score': 10,
  'analysis': '',
  'timer': 10,
  'type': 6,
  'index': 999, 
},{
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
  'analysis': '答案：A，附近啊看风景安康大法师打发举案说法拉斯法三等奖发神经发顺丰发沙发沙发沙发沙发沙发沙发沙发沙发沙发按算法是否开机阿六块腹肌啊反馈啦爱发呆发呆发发',
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
  'analysis':'答案：B，附近啊看风景安康大法师打发举案说法拉斯法三等奖发神经发顺丰发沙发沙发沙发沙发沙发沙发沙发沙发沙发按算法是否开机阿六块腹肌啊反馈啦爱发呆发呆发发',
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
    'analysis': '答案：A，附近啊看风景安康大法师打发举案说法拉斯法三等奖发神经发顺丰发沙发沙发沙发沙发沙发沙发沙发沙发沙发按算法是否开机阿六块腹肌啊反馈啦爱发呆发呆发发',
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
  'analysis': '答案：D，附近啊看风景安康大法师打发举案说法拉斯法三等奖发神经发顺丰发沙发沙发沙发沙发沙发沙发沙发沙发沙发按算法是否开机阿六块腹肌啊反馈啦爱发呆发呆发发',
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
  'analysis': '答案：C，附近啊看风景安康大法师打发举案说法拉斯法三等奖发神经发顺丰发沙发沙发沙发沙发沙发沙发沙发沙发沙发按算法是否开机阿六块腹肌啊反馈啦爱发呆发呆发发',
  'type': 5,
  'index': 1004,
}];

Page({
  data: {
    ID: -1,
    PAGE: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    empirical: 999,
    ranking: 0,
    progress: 99,
    showAnalytics:false,
    Height: 150,
    empiricalV: 0,
    levelV: 0,
    windowW: 0,
    windowH: 0,
    score: 13242,
    score1: 0,
    typeScore: 0,
    answer: [],
    question: [],
    answerid: [],
    character: [],
    question_type: 1,
    type3imagesW: 300,
    type3imagesH: 200,
    levelNum: 9999,
    showFragment: 1,
    oldLevel: 0,
    showModal: false,
    pendEvent: false,
    gameOver: false,
    timer: null,
    pendindDuration: 1000,
    answerIndex: -1,
    characterBgColor: [],
    hearts: [],
    continueRight: 0,
    continueMaxRight: 0,
    errorCateoryList: [],
    MAX_Q_COUNT: 30,
    total_question_count: 0,
    curIndex: 0,
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
    tree: "",
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (option) {
    this.data.ID = option.id;
    this.data.PAGE = 0;
    console.log(' get select id:' + this.data.ID)
    console.log(' get app.globalData.userInfo:' + app.globalData.userInfo)
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          windowW: res.windowWidth,
          windowH: res.windowHeight,
          screenWidth: res.windowWidth,
        })
      }
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#b382dd',
    });
    wx.setNavigationBarTitle({
      title: "题库练习"
    })

    this.init();
  },
  init: function() {
    this.loadDataFromServer(this.data.PAGE, this.data.ID);
  },
  getUserInfo: function (e) {
    console.log(' getUserInfo')
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  loadDataFromServer: function (page, id) {
    console.log('loadDataFromServer page:' + page + ' id:'+id);
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

        if(DEBUG) {
          that.data.tree = datatreeDebug;
        } else {
          var newtree = [];
          if(page > 0 && that.data.tree.length > 0) {
            for(var i = 0; i < that.data.tree.length; i++) {
              newtree.push(that.data.tree[i]);
            }

            for (var i = 0; i < response.data.data.length; i++) {
              newtree.push(response.data.data[i]);
            }

            that.data.tree = newtree;
          } else {
            that.data.tree = response.data.data;
          }
        }

        if (that.data.tree == null || that.data.tree.length == 0) {
          this.setData({
            gameOver: true,
            showFragment: 0,
          });
          this.cancelTimer();
          this.saveCacheData(); 
        } else {
            that.setCurrentQuestionData(that.data.curIndex);
        }
        console.log(that.data.tree);
      },
      fail: function (err) {
        console.log('请求失败', err);
      }
    });
  },

  setCurrentQuestionData(index) {
    console.log('setCurrentQuestionData index:'+index);
    var section = this.data.tree[index];
    var type = section.type;

    this.data.pendEvent = false;
    this.data.answer = [];
    this.data.question = [];
    this.data.answerid = [];
    this.data.characterBgColor = [];
    this.data.character = [];
   
    this.data.character.push('../../images/ic_a.png');
    this.data.character.push('../../images/ic_b.png');
    this.data.character.push('../../images/ic_c.png');
    this.data.character.push('../../images/ic_d.png');
    console.log(' section index:' + index + ' section type:' + section.type + ' analysis:' + section.analysis); 
   
    this.setData({
      answer: this.data.answer,
      question: section,
      question_type: section.question_type,
      answerid: this.data.answerid,
      showFragment: type,
      answerIndex: -1,
      progress: 100,
      showAnalytics:false,
      empiricalV: "第" + section.index + "题",
      characterBgColor: this.data.characterBgColor,
      character: this.data.character,
      curIndex:this.data.curIndex,
      total_question_count: this.data.total_question_count,
    })

    if (this.data.curIndex == this.data.total_question_count - 1) {
      this.data.total_question_count++;
    }
    
    app.addChallengeCnt(1);
  },

  showModal: function () {
    var that = this;
    this.cancelTimer();
    this.saveCacheData();
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

  checkAnswer: function (id) {
    var question = this.data.tree[this.data.curIndex];
    if (question.answer == id)
      return true;
    else
      return false;
  },

  showAnswer: function (id) {
    var section = this.data.tree[this.data.curIndex];
    var ret = this.checkAnswer(id);

    console.log('showAnswer:' + id + ' ret is:' + ret);

    if (ret) {
      this.data.characterBgColor[id] = '#9be665';
      this.data.continueRight++;
      this.data.character[id] = '/images/ic_aws_right.png';
    } else {
      app.updateWinningStreak(this.data.continueRight);
      if (this.data.continueRight > this.data.continueMaxRight) {
        this.setData({
          continueMaxRight: this.data.continueRight,
        })
      }

      this.data.errorCateoryList.push(section);
      console.log('errorCateoryList:')
      console.log(this.data.errorCateoryList)
      this.data.continueRight = 0;
      this.data.characterBgColor[section.answer] = '#9be665';
      this.data.character[section.answer] = '/images/ic_aws_right.png';

      if (id >= 0) {
        this.data.characterBgColor[id] = '#F76F40';
        this.data.character[id] = '/images/ic_aws_error.png';
      }
    } 

    if (section.analysis != "[]" && section.analysis != "") {
      this.data.showAnalytics = true;
    } else {
      this.data.showAnalytics = false;
    }
   
    var index = parseInt(section.answer) + 1;
    this.setData({
      characterBgColor: this.data.characterBgColor,
      character: this.data.character,
      answerIndex: index,
      showAnalytics: this.data.showAnalytics,
    }); 
  },

  onClickAnswer: function (e) {
    if (this.data.pendEvent) {
      console.log(' pendEvent !!!');
      return;
    }
    console.log(' call cancelTimer');
    this.cancelTimer();
    console.log(' call showAnswer');
    this.showAnswer(e.target.id);
    console.log(' showAnalytics:' + this.data.showAnalytics);
    this.data.pendEvent = true;
  },

  loadNext: function (delay) { 
    console.log('loadNext delay:' + delay);
    if (this.showChallengeResult(false))
      return;

    if(this.data.curIndex >= this.data.MAX_Q_COUNT - 1) {
      //study done.
      this.showChallengeResult(true);
      return;
    }

    if (this.data.curIndex >= this.data.tree.length - 1) {
      this.data.curIndex++;
      this.data.PAGE += 1;
      this.loadDataFromServer(this.data.PAGE, this.data.ID);
    } else {
      var that = this;
      this.data.curIndex++;
      setTimeout(function () {
        that.setCurrentQuestionData(that.data.curIndex);
      }, delay);
    }
  },

  loadPrev: function(delay) {
    console.log('loadPrev delay:' + delay);
    if (this.showChallengeResult(false))
      return;

    if (this.data.curIndex == 0) {
      //study 0.
      return;
    }

    if (this.data.curIndex == 0) {
      this.data.curIndex = this.data.tree.length - 1;
    } else {
      this.data.curIndex--;
    }

    this.setCurrentQuestionData(this.data.curIndex);
  },

  onClickCloseModal: function () {
    console.log(' onClickCloseModal !');
    this.showChallengeResult(true);
  },

  showChallengeResult: function (force) {
    if (force || this.data.total_question_count >= this.data.MAX_Q_COUNT) {
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
      }, delay);
      return true;
    } else {
      return false;
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
  onClickSelf: function () {
    wx.navigateTo({
      url: '../select/select' + '?lockLevel=' + (5) + '&maxLevel=' + 5
    })
  },

  onClickAgain: function () {
    console.log(' onClickAgain !!!');
    this.reLoadData();
  },

  cancelTimer: function () {
    if (this.data.timer != null) {
      console.log(' clearTimeout at first !!!');
      clearTimeout(this.data.timer);
      this.data.timer = null;
    }
  },

  saveCacheData: function () {
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
    if (intervalId != "") {
      clearInterval(intervalId); // 清除setInterval  
    }
   
    this.time = 0;
  },
  onUnload: function () {
    console.log("==onUnload==");
    this.cancelTimer();
    this.saveCacheData();
    if (intervalId != "") {
      clearInterval(intervalId); // 清除setInterval  
    }  
    this.time = 0;
  },
  onShareAppMessage: function (ops) {
    var that = this;
    if (ops.from == 'button') {
      return {
        title: '[有人@我]来试试好玩的单词学习工具吧',
        path: 'pages/home/home',
        imageUrl: 'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/share/share_invite_logo.png',
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    } else {
      return {
        title: '[有人@我]来试试好玩的单词学习工具吧',
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
  reLoadData: function () {
    if (this.data.gameOver) {
      this.setData({
        gameOver: false,
        total_question_count: 0,
        continueMaxRight: 0,
      })
      this.data.PAGE = 0;
      this.data.curIndex = 0;
      this.loadDataFromServer(this.data.PAGE, this.data.ID);
    } else if (this.data.showModal) {
      this.retryAgain();
    }
  },

  retryAgain: function () {
    this.setData({
      showModal: false,
    });
    this.data.pendEvent = false;
    this.loadNext(200);
  },

  onShow: function() {
    console.log('study ------------->  onShow')
    console.log('this.globalData.commonStudyCategory');
    console.log(app.globalData.commonStudyCategory);
    console.log('study ------------->  onShow end')
  }, 

  onClickPrev : function() {
    console.log('onClickPrev');
    this.loadPrev(10);
  },

  onClickNext: function () {
    console.log('onClickNext');
    this.loadNext(10);
  }

})
