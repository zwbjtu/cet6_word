const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var tmpFCSubLevels = [];
var tmpFCChallengeSubLevels = [];
var tmpFCPKSubLevels = [];

Page({
  data: {
    motto: 'CET6WORD',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    empirical:0,
    level:0,
    ranking:0,
    progress:50,
    Height:150,
    empiricalV:0,
    levelV:0,
    windowW:0,
    windowH:0,
    challenge:-1,
    rankingType:2,
    datalist:[],
    crownlist:[],
    idxbgcolorlist:[],
    page_index:0,
    categoryID:32,
    myCategoryRanking:0,
    myGlobalRanking:0,
    showCategoryList:false,
    categoryTitle:'暂无已挑战项',
    categoryList:[],
    loading:false,
    list: [{ title: "题目1", content: "内容1" },
    { title: "题目2", content: "内容2" },
    { title: "题目3", content: "内容3" },
    { title: "题目4", content: "内容4" }],
    friendlist: [{
      ranking: 1,
      name: '张三',
      src: '/images/8.png',
      level:'等级:2',
      rate:'50%',
    }, {
      ranking: 2,
      name: '李四',
      src: '/images/5.png',
      level: '等级:4',
      rate: '50%',
    }, {
      ranking: 3,
      name: '王五',
      src: '/images/1.png',
      level: '等级:7',
      rate: '50%',
    }, {
      ranking: 4,
      name: '马六',
      src: '/images/10.png',
      level: '等级:1',
      rate: '50%',
    }, {
      ranking: 10,
      name: '张三',
      src: '/images/8.png',
      level: '等级:2',
      rate: '50%',
    }, {
      ranking: 12,
      name: '李四',
      src: '/images/5.png',
      level: '等级:4',
      rate: '50%',
    }, {
      ranking: 31,
      name: '王五',
      src: '/images/1.png',
      level: '等级:7',
      rate: '50%',
    }, {
      ranking: 14,
      name: '马六',
      src: '/images/10.png',
      level: '等级:1',
      rate: '50%',
    }],
    worlddata: [{
      ranking: 2,
      name: '李四1',
      src: '/images/5.png',
      level: '等级:4',
      rate: '50%',
    }, {
      ranking: 3,
      name: '王五1',
      src: '/images/1.png',
      level: '等级:7',
      rate: '50%',
    }, {
      ranking: 4,
      name: '马六1',
      src: '/images/10.png',
      level: '等级:1',
      rate: '50%',
    }, {
      ranking: 10,
      name: '张三1',
      src: '/images/8.png',
      level: '等级:2',
      rate: '50%',
    }, {
      ranking: 12,
      name: '李四2',
      src: '/images/5.png',
      level: '等级:4',
      rate: '50%',
    }, {
      ranking: 31,
      name: '王五3',
      src: '/images/1.png',
      level: '等级:7',
      rate: '50%',
    }, {
      ranking: 14,
      name: '马六4',
      src: '/images/10.png',
      level: '等级:1',
      rate: '50%',
    }],    
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#bb6ed5',
    });    
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
    this.initData();
    this.setData({
      rankingType: 2,
      categoryID: 32,
      //datalist: this.data.friendlist,
      myGlobalRanking: app.globalData.userRanking,
      //categoryList: app.globalData.commonList,
    });
    
    this.getWorldRankingList(0);
    // this.getCategoryRankingList(0, this.data.categoryID);
  },

  initData:function(){
    // this.loadFavoriteCategory();
    this.data.crownlist = new Array();
    this.data.crownlist[0] = "/images/ic_rank_1.png";
    this.data.crownlist[1] = "/images/ic_rank_2.png";
    this.data.crownlist[2] = "/images/ic_rank_3.png";

    this.data.idxbgcolorlist = new Array();
    this.data.idxbgcolorlist[0] = "#FDAF01";
    this.data.idxbgcolorlist[1] = "#DD4E43";
    this.data.idxbgcolorlist[2] = "#00A2FF";

    this.setData({
      crownlist: this.data.crownlist,
      idxbgcolorlist: this.data.idxbgcolorlist,
    });

    this.getScoreInfo();
  },

  loadFavoriteCategory: function () {
    console.log('loadFavoriteCategory');
    var that = this;
   
    wx.getStorage({
      key: 'favoriteCategorySubLevels',
      success: function (res) {
        console.log("获取 favoriteCategorySubLevels 数据成功:");
        tmpFCChallengeSubLevels = res.data;
        console.log(tmpFCChallengeSubLevels);
        
        wx.getStorage({
          key: 'favoritePKCategorySubLevels',
          success: function (res) {
            console.log("获取 favoritePKCategorySubLevels 数据成功:");
            tmpFCPKSubLevels = res.data;
            console.log(tmpFCPKSubLevels);
            that.loadAllFavoriteCategories();
          },

          fail: function (res) {
            console.log("获取 favoritePKCategorySubLevels 数据失败");
            that.loadAllFavoriteCategories();
          }
        });
      },

      fail: function (res) {
        console.log("获取 favoriteCategorySubLevels 数据失败");

        wx.getStorage({
          key: 'favoritePKCategorySubLevels',
          success: function (res) {
            console.log("获取 favoritePKCategorySubLevels 数据成功:");
            tmpFCPKSubLevels = res.data;
            console.log(tmpFCPKSubLevels);
            that.loadAllFavoriteCategories();
          },

          fail: function (res) {
            console.log("获取 favoritePKCategorySubLevels 数据失败");
            that.loadAllFavoriteCategories();
          }
        });
      }  
    });

    console.log('loadFavoriteCategory end-----');
  },

  loadAllFavoriteCategories: function() {
    console.log('loadAllFavoriteCategories');
    var that = this;

    if(tmpFCPKSubLevels.length == 0 && tmpFCChallengeSubLevels.length == 0) { //00
      that.data.favoriteCategorySubLevels = [];
    } else if (tmpFCPKSubLevels.length == 0 && tmpFCChallengeSubLevels.length != 0) {//01
      that.data.favoriteCategorySubLevels = tmpFCChallengeSubLevels;
    } else if (tmpFCPKSubLevels.length != 0 && tmpFCChallengeSubLevels.length == 0) {//10
      that.data.favoriteCategorySubLevels = tmpFCPKSubLevels;
    } else if (tmpFCPKSubLevels.length != 0 && tmpFCChallengeSubLevels.length != 0) {//11
      that.data.favoriteCategorySubLevels = tmpFCChallengeSubLevels;
      for (var i = 0; i < tmpFCPKSubLevels.length; i++) {
        var pkcategory = tmpFCPKSubLevels[i];
        var alreayexsit = false;
        for (var j = 0; j < tmpFCChallengeSubLevels.length; j++) {
          var cllcategory = tmpFCChallengeSubLevels[j];
          if (pkcategory.subId == cllcategory.subId) {
            alreayexsit = true;
            break;
          }
        }   
        if (!alreayexsit) {
          that.data.favoriteCategorySubLevels.push(pkcategory);
          console.log('add :'+ pkcategory);
        } else {
          console.log('already exsit, ignore.');
        }
      }
    } 

    if (that.data.favoriteCategorySubLevels.length > 0) {
      var tmptitle = '';
      if (that.data.favoriteCategorySubLevels[0].title == that.data.favoriteCategorySubLevels[0].subtitle1) {
        tmptitle = that.data.favoriteCategorySubLevels[0].title;
      } else {
        tmptitle = that.data.favoriteCategorySubLevels[0].title + that.data.favoriteCategorySubLevels[0].subtitle1;
      }
      that.setData({
        categoryTitle: tmptitle,
        categoryID: that.data.favoriteCategorySubLevels[0].subId
      });
    }

    that.setData({
      categoryList: that.data.favoriteCategorySubLevels,
    });

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
    ctx.setStrokeStyle('');
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.stroke()
  },
  drawCircle: function (ctx, x, y) {
    ctx.beginPath();
    ctx.setFillStyle('#eec700');
    ctx.arc(x, y, 40, 0, 2 * Math.PI);
    ctx.fill()
  },
  onClickFriendRanking:function(){
    this.setData({
      rankingType:1,
      datalist: this.data.friendlist
    });
  },
  onClickWorldRanking: function () {
    if (this.data.rankingType == 2) {//世界排名
      return;
    }
    this.setData({
      rankingType: 2, 
      page_index: 0,
    });
    this.getWorldRankingList(0);
  },
  onClickCategoryRanking: function () {
    if (this.data.rankingType == 3){//科目排名
      return ;
    }
    this.setData({
      rankingType: 3,
      page_index:0,
    });
    console.log('categoryID:' + this.data.categoryID);
    if (this.data.categoryID > 0){
      this.getCategoryRankingList(0, this.data.categoryID);
    }else{
      this.setData({
        datalist: [],
      });
    }
  },
  onScrolltolower:function(e){
    if (this.data.rankingType == 2){
      this.setData({
        loading: true,
      });
      this.getWorldRankingList(++this.data.page_index);
    } else if (this.data.rankingType == 3){
      this.setData({
        loading: true,
      });
      this.getCategoryRankingList(++this.data.page_index, this.data.categoryID);
    }
    /*
    for(var i=0; i< this.data.worlddata.length; i++){
      this.data.datalist.push(this.data.worlddata[i]);
    }
    console.log(e);
    //this.data.datalist.concat(this.data.worlddata);
    this.setData({
      datalist: this.data.datalist,
    });
    console.log(this.data.datalist);
    */
  },
  onScrolltoupper: function (e) {
    console.log(e);
  },
  onClickSelectCategory:function(e){
    if(this.data.categoryList.length == 0) {
      return;
    }

    this.setData({
      showCategoryList: !this.data.showCategoryList,
    });
  },

  getWorldRankingList: function (index) {
    var that = this;
    qcloud.request({
      url: config.service.getWorldRankingList,
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        openid: app.globalData.openId,
        page_index: index,
      },
      success: (response) => {
        console.log('请求成功  getWorldRankingList statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          console.log(response.data);

          if (that.data.page_index ==0){
            this.setData({
              datalist: response.data.data,
            });
          }else{
            for (var i = 0; i < response.data.data.length; i++) {
              this.data.datalist.push(response.data.data[i]);
            }
            this.setData({
              datalist: this.data.datalist,
                loading: false,
            });
          }
          this.data.crownlist = new Array();
          this.data.crownlist[0] = "/images/ic_rank_1.png";
          this.data.crownlist[1] = "/images/ic_rank_2.png";
          this.data.crownlist[2] = "/images/ic_rank_3.png";
        
          this.data.idxbgcolorlist = new Array();
          this.data.idxbgcolorlist[0] = "#FDAF01";
          this.data.idxbgcolorlist[1] = "#DD4E43";
          this.data.idxbgcolorlist[2] = "#00A2FF";

          this.setData({
            crownlist: this.data.crownlist,
            idxbgcolorlist: this.data.idxbgcolorlist,
          });
        }
      },
      fail: function (err) {
        console.log('请求 LevelRule 失败', err);
        if(this.data.loading) {
          this.setData({
            loading: false,
          });
        }
      }
    });
  },
  getCategoryRankingList: function (index, id) {
    console.log('getCategoryRankingList index:' + index + ' id:' + id + ' app.globalData.openId:' + app.globalData.openId);
    var that = this;
    qcloud.request({
      url: config.service.getRankingList,
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        openid: app.globalData.openId, 
        page_index: index,
        category_id:id,
      },
      success: (response) => {
        console.log('请求成功  getCategoryRankingList statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          console.log(response.data);
          // for (var i = 0; i < response.data.data.ranklist.length; i++) {
          //   response.data.data[i].total_score = response.data.data.ranklist[i].score;
          // }
          if (that.data.page_index == 0) {
            this.setData({
              datalist: response.data.data.ranklist,
              myCategoryRanking: response.data.data.rank,
            });
          } else {
            for (var i = 0; i < response.data.data.ranklist.length; i++) {
              this.data.datalist.push(response.data.data.ranklist[i]);
            }
            this.setData({
              datalist: this.data.datalist,
              myCategoryRanking: response.data.data.rank,
              loading: false,
            });
          }

        }
      },
      fail: function (err) {
        console.log('请求 getCategoryRankingList 失败', err);
        if (this.data.loading) {
          this.setData({
            loading: false,
          });
        }
      }
    });
  },  
  onSelectCategory:function(e){
    console.log('onSelectCategory');
    console.log(e.target.id);

    var tmptitle = '';
    if (this.data.categoryList[e.target.dataset.idx].title == this.data.categoryList[e.target.dataset.idx].subtitle1) {
      tmptitle = this.data.categoryList[e.target.dataset.idx].subtitle1;
    } else {
      tmptitle = this.data.categoryList[e.target.dataset.idx].title + this.data.categoryList[e.target.dataset.idx].subtitle1;
    }

    console.log('----------------- tmptitle:' + tmptitle);

    this.setData({
      showCategoryList: !this.data.showCategoryList,
      page_index: 0,
      categoryID :e.target.id,
      categoryTitle: tmptitle,
    });
    this.getCategoryRankingList(0, this.data.categoryID);
  },

  onSelectDialogClose: function (e) {
    console.log('onSelectDialogClose');
    console.log(e.target.id);
    this.setData({
      showCategoryList: false,
    });

    //this.getCategoryRankingList(0, this.data.categoryID);
  },
  onShareAppMessage: function (res) {
    let that = this
    return {
      title: '[有人@我]看看你的四级词汇量能排第几！',
      path: 'pages/home/home',
      success: function (res) {
        console.log(res)
      }
    }
  },
  getScoreInfo: function () {
    var that = this;
    qcloud.request({
      url: config.service.getScoreInfo,
      header: {
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        openId: app.globalData.openId,
      },
      success: (response) => {
        console.log('请求 getScoreInfo 成功 statusCode:' + response.statusCode);
        if (response.statusCode == 200) {
          app.globalData.scoreInfo = response.data.data;
          console.log(response.data.data);
          app.globalData.totalScore = app.globalData.scoreInfo.totalScore;
          app.globalData.userRanking = app.globalData.scoreInfo.worldRanking;
          app.globalData.total = app.globalData.scoreInfo.total;
          console.log('updateScoreInfoCallBack total:' + app.globalData.total);
          console.log(app.globalData.updateScoreInfoCallBack)
          if (app.globalData.updateScoreInfoCallBack != null) {
            app.globalData.updateScoreInfoCallBack(app.globalData.scoreInfo);
          }

          this.setData({
            myGlobalRanking: app.globalData.userRanking,
          });
        }
      },
      fail: function (err) {
        console.log('请求失败', err);
      }
    });
  },
})
