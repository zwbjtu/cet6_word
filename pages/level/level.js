var app = getApp()
var topcategoryid = -1;

Page({
  data: {
    frompageid: 0,
    level:[],
    CLASS:[],
    CLASSID:[],
    categoryTree: [],
    categoryStudyTree: [],
    categoryPKTree: [],
    selectClass:null,
    selectLevel:null, 
    isClass:true,
    TREE:null,
    favoriteList: [],
    favoriteCategory: {
      id: 0,
      title: "常用",
      src: 'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/select/category_idx_fav.png',
      color: '#f49967',
      subLevel: [],
    },
    selectCategory: {
      id: 0,
      title: "none",
      subId: 0,
      src: null,
      subtitle:"none",
      subtitle1: "none", 
    },
    favoriteStudyList: [],
    favoriteStudyCategory: {
      id: 0,
      title: "常用",
      src: 'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/select/category_idx_fav.png',
      color: '#f49967',
      subLevel: [],
    },
    selectStudyCategory: {
      id: 0,
      title: "none",
      subId: 0,
      src: null,
      subtitle: "none",
      subtitle1: "none",
    },
    favoritePKList: [],
    favoritePKCategory: {
      id: 0,
      title: "常用",
      src: 'https://lg-6enwjric-1256925828.cos.ap-shanghai.myqcloud.com/select/category_idx_fav.png',
      color: '#f49967',
      subLevel: [],
    },
    selectPKCategory: {
      id: 0,
      title: "none",
      subId: 0,
      src: null,
      subtitle: "none",
      subtitle1: "none",
    },
  },
  onLoad: function (option) {
    console.log('onLoad option.id:' + option.id+' frompageid:' + option.frompageid)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#7d49c7',
    });

    topcategoryid = option.id;

    if (option.frompageid == 4) {
      this.loadFavoriteStudyCategory();
    } else if (option.frompageid == 2) {
      this.loadFavoritePKCategory();
    } else {
      this.loadFavoriteCategory();
    }
   
  },

  initData: function (id, fpid){
    console.log('initData id:'+id+" fpid:"+fpid);
    var that = this;
    var classes ;
    
    if(fpid == 4) {
      classes = this.findCategoryStudyItemById(id);
    } else if (fpid == 2) {
      classes = this.findCategoryPKItemById(id);
    } else {
      classes = this.findCategoryItemById(id);
    }
    
    console.log("classes:");
    console.log(classes);
    for (var i = 0; i < classes.subLevel.length; i++) {
      var obj = classes.subLevel[i];
      this.data.CLASS.push(obj.title);
      this.data.CLASSID.push(obj.id);
    }

    this.setData({
      CLASS: this.data.CLASS,
      CLASSID: this.data.CLASSID,
      TREE:classes,
      frompageid: fpid,
    });

    console.log("CLASS:" + this.data.CLASS + ' class len:'+this.data.CLASS.length);
  },

  resetData: function (value) {
    console.log('resetData value:'+value);
    this.data.CLASS = [];
    this.data.CLASSID = [];
    for (var i = 0; i < value.length; i++) {
      this.data.CLASS.push(value[i].title);
      this.data.CLASSID.push(value[i].id);
    }
    this.setData({
      CLASS: this.data.CLASS,
      CLASSID: this.data.CLASSID
    });
    console.log("CLASS:" + this.data.CLASS + this.data.CLASS.length);
  },

  onLevelSelect:function(e){
    console.log(' onLevelSelect:'+e.target.id);
    var pullID = -1;
    var title = null;
    var id = e.target.id;
    var tree = this.data.TREE.subLevel;
    for (var i = 0; i < tree.length; i++) {
      var obj = tree[i];
      console.log(' onLevelSelect title:' + obj.title + ' obj.id:' + obj.id);
      if (id == obj.id){
        if (obj.subLevel != null && obj.subLevel.length > 0){
          var subObj = obj.subLevel;
          this.resetData(subObj);
          return;
        }else{
          pullID = id;
          title = obj.title;
          break;
        }
      }

      var subObj = obj.subLevel;
      if(subObj == null)
        continue;

      for (var j = 0; j < subObj.length; j++) {
        var obj2 = subObj[j];
        console.log(' subLevel title:' + obj2.title + ' obj.id:' + obj2.id);
        if (id == obj2.id) {
          pullID = id;
          title = obj2.title;
          break;
        }
      }
      if (pullID > 0){
        break;
      }
    } 

    if (this.data.frompageid == 4) {
      this.data.selectStudyCategory.id = (10000 + id);
      this.data.selectStudyCategory.subId = id;
      this.data.selectStudyCategory.title = this.data.TREE.title;
      this.data.selectStudyCategory.src = this.data.TREE.src;
      this.data.selectStudyCategory.subtitle = this.data.TREE.subtitle;
      this.data.selectStudyCategory.subtitle1 = title;

      console.log('  open study with param id:' + id);
      console.log(this.data.selectStudyCategory);

      this.updateFavoriteStudyCategory(id, this.data.selectStudyCategory);

      wx.redirectTo({
        url: '../study/study?id=' + id,
      })
    } else if (this.data.frompageid == 2) {
      this.data.selectPKCategory.id = (10000 + id);
      this.data.selectPKCategory.subId = id;
      this.data.selectPKCategory.title = this.data.TREE.title;
      this.data.selectPKCategory.src = this.data.TREE.src;
      this.data.selectPKCategory.subtitle = this.data.TREE.subtitle;
      this.data.selectPKCategory.subtitle1 = title;

      console.log('  open study with param id:' + id);
      console.log(this.data.selectPKCategory);

      this.updateFavoritePKCategory(id, this.data.selectPKCategory);

      wx.redirectTo({
        url: '../invitation/invitation?id=' + id,
      })
    } else {
      this.data.selectCategory.id = (10000 + id);
      this.data.selectCategory.subId = id;
      this.data.selectCategory.title = this.data.TREE.title;
      this.data.selectCategory.src = this.data.TREE.src;
      this.data.selectCategory.subtitle = this.data.TREE.subtitle;
      this.data.selectCategory.subtitle1 = title;

      console.log('  open challenge with param id:' + id);
      console.log(this.data.selectCategory);

      this.updateFavoriteCategory(id, this.data.selectCategory);

      wx.redirectTo({
        url: '../challenge/challenge?id=' + id,
      })
    }
  },
 
  navigateBackFunc: function (level) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]  //上一个页面
    prevPage.setData({
      selectLevel: level
    })
    wx.navigateBack();
  },

  updateFavoriteStudyCategory: function (id, data) {
    console.log('++++++> updateFavoriteStudyCategory id:' + id);
    console.log(data);

    var alreadyInFavoritePosIdx = -1;

    console.log('favoriteStudyCategory:');
    console.log(this.data.favoriteStudyCategory);

    for (var i = 0; i < this.data.favoriteStudyCategory.subLevel.length; i++) {
      var obj = this.data.favoriteStudyCategory.subLevel[i];
      if (obj.id == (data.id)) {
        alreadyInFavoritePosIdx = i;
        break;
      }
    }

    console.log('  alreadyInFavoritePosIdx:' + alreadyInFavoritePosIdx);

    if (alreadyInFavoritePosIdx < 0) { //not in common at before.
      if (this.data.favoriteStudyCategory.subLevel.length >= 6) {
        this.data.favoriteStudyCategory.subLevel.splice(5, 1);
      }

      var list = [];
      list.push(data);

      for (var i in this.data.favoriteStudyCategory.subLevel) {
        list.push(this.data.favoriteStudyCategory.subLevel[i]);
      }

      this.data.favoriteStudyCategory.subLevel = list;
    } else if (alreadyInFavoritePosIdx == 0) { //already stay at the latest position in common.
      //no need move, evething is ok.
    } else { //stay in common, not the latest one, move to the first position.
      this.data.favoriteStudyCategory.subLevel.splice(alreadyInFavoritePosIdx, 1);

      var list = [];
      list.push(data);

      for (var i in this.data.favoriteStudyCategory.subLevel) {
        list.push(this.data.favoriteStudyCategory.subLevel[i]);
      }

      this.data.favoriteStudyCategory.subLevel = list;

    }

    this.updateUserUsedStudyCategoryList(id, data);

    wx.setStorage({
      key: 'favoriteStudyCategorySubLevels',
      data: this.data.favoriteStudyCategory.subLevel,
    });
  },

  updateFavoritePKCategory: function (id, data) {
    console.log('++++++> updateFavoritePKCategory id:' + id);
    console.log(data);

    var alreadyInFavoritePosIdx = -1;

    console.log('favoritePKCategory:');
    console.log(this.data.favoritePKCategory);

    for (var i = 0; i < this.data.favoritePKCategory.subLevel.length; i++) {
      var obj = this.data.favoritePKCategory.subLevel[i];
      if (obj.id == (data.id)) {
        alreadyInFavoritePosIdx = i;
        break;
      }
    }

    console.log('  alreadyInFavoritePosIdx:' + alreadyInFavoritePosIdx);

    if (alreadyInFavoritePosIdx < 0) { //not in common at before.
      if (this.data.favoritePKCategory.subLevel.length >= 6) {
        this.data.favoritePKCategory.subLevel.splice(5, 1);
      }

      var list = [];
      list.push(data);

      for (var i in this.data.favoritePKCategory.subLevel) {
        list.push(this.data.favoritePKCategory.subLevel[i]);
      }

      this.data.favoritePKCategory.subLevel = list;
    } else if (alreadyInFavoritePosIdx == 0) { //already stay at the latest position in common.
      //no need move, evething is ok.
    } else { //stay in common, not the latest one, move to the first position.
      this.data.favoritePKCategory.subLevel.splice(alreadyInFavoritePosIdx, 1);

      var list = [];
      list.push(data);

      for (var i in this.data.favoritePKCategory.subLevel) {
        list.push(this.data.favoritePKCategory.subLevel[i]);
      }

      this.data.favoritePKCategory.subLevel = list;
    }

    this.updateUserUsedPKCategoryList(id, data);

    wx.setStorage({
      key: 'favoritePKCategorySubLevels',
      data: this.data.favoritePKCategory.subLevel,
    });
  },

  updateFavoriteCategory: function (id, data) {
    console.log('++++++> updateFavoriteCategory id:' + id);
    console.log(data);

    var alreadyInFavoritePosIdx = -1;

    console.log('favoriteCategory:');
    console.log(this.data.favoriteCategory);

    for (var i = 0; i < this.data.favoriteCategory.subLevel.length; i++) {
      var obj = this.data.favoriteCategory.subLevel[i];
      if (obj.id == (data.id)) {
        alreadyInFavoritePosIdx = i;
        break;
      }
    }

    console.log('  alreadyInFavoritePosIdx:' + alreadyInFavoritePosIdx);

    if (alreadyInFavoritePosIdx < 0) { //not in common at before.
      if (this.data.favoriteCategory.subLevel.length >= 6) {
        this.data.favoriteCategory.subLevel.splice(5, 1);
      }

      var list = [];
      list.push(data);

      for (var i in this.data.favoriteCategory.subLevel) {
        list.push(this.data.favoriteCategory.subLevel[i]);
      }

      this.data.favoriteCategory.subLevel = list;
    } else if (alreadyInFavoritePosIdx == 0) { //already stay at the latest position in common.
      //no need move, evething is ok.
    } else { //stay in common, not the latest one, move to the first position.
      this.data.favoriteCategory.subLevel.splice(alreadyInFavoritePosIdx, 1);

      var list = [];
      list.push(data);

      for (var i in this.data.favoriteCategory.subLevel) {
        list.push(this.data.favoriteCategory.subLevel[i]);
      }

      this.data.favoriteCategory.subLevel = list;

    }
 
    this.updateUserUsedCategoryList(id, data);

    wx.setStorage({
      key: 'favoriteCategorySubLevels',
      data: this.data.favoriteCategory.subLevel,
    }); 
  }, 

  updateUserUsedStudyCategoryList: function (id, data) {
    console.log('updateUserUsedStudyCategoryList data:');
    console.log(data);
    console.log('favoriteStudyList');
    console.log(this.data.favoriteStudyList);

    var alreadyInFavoritePosIdx = -1;
    for (var i = 0; i < this.data.favoriteStudyList.length; i++) {
      var obj = this.data.favoriteStudyList[i];
      if (obj.subId == (data.subId)) {
        console.log('  find:' + id + ' has already exist!');
        console.log(data);
        alreadyInFavoritePosIdx = i;
        break;
      }
    }

    console.log('  alreadyInFavoritePosIdx:' + alreadyInFavoritePosIdx);

    var list = [];
    if (alreadyInFavoritePosIdx < 0) {
      list.push(data);
      for (var i in this.data.favoriteStudyList) {
        list.push(this.data.favoriteStudyList[i]);
      }
      this.data.favoriteStudyList = list;
    } else if (alreadyInFavoritePosIdx == 0) {
      //no need update.
    } else {
      list.push(data);
      for (var i in this.data.favoriteStudyList) {
        if (i == alreadyInFavoritePosIdx) {
          continue;
        }
        list.push(this.data.favoriteStudyList[i]);
      }
      this.data.favoriteStudyList = list;
    }


    console.log(this.data.favoriteStudyList);
    wx.setStorage({
      key: 'favoriteStudyList',
      data: this.data.favoriteStudyList,
    });
  },

  updateUserUsedPKCategoryList: function (id, data) {
    console.log('updateUserUsedPKCategoryList data:');
    console.log(data);
    console.log('favoritePKList');
    console.log(this.data.favoritePKList);

    var alreadyInFavoritePosIdx = -1;
    for (var i = 0; i < this.data.favoritePKList.length; i++) {
      var obj = this.data.favoritePKList[i];
      if (obj.subId == (data.subId)) {
        console.log('  find:' + id + ' has already exist!');
        console.log(data);
        alreadyInFavoritePosIdx = i;
        break;
      }
    }

    console.log('  alreadyInFavoritePosIdx:' + alreadyInFavoritePosIdx);

    var list = [];
    if (alreadyInFavoritePosIdx < 0) {
      list.push(data);
      for (var i in this.data.favoritePKList) {
        list.push(this.data.favoritePKList[i]);
      }
      this.data.favoritePKList = list;
    } else if (alreadyInFavoritePosIdx == 0) {
      //no need update.
    } else {
      list.push(data);
      for (var i in this.data.favoritePKList) {
        if (i == alreadyInFavoritePosIdx) {
          continue;
        }
        list.push(this.data.favoritePKList[i]);
      }
      this.data.favoritePKList = list;
    }

    console.log(this.data.favoritePKList);
    wx.setStorage({
      key: 'favoritePKList',
      data: this.data.favoritePKList,
    });
  },

  updateUserUsedCategoryList: function (id, data) {
    console.log('updateUserUsedCategoryList data:');
    console.log(data);
    console.log('favoriteList');
    console.log(this.data.favoriteList);

    var alreadyInFavoritePosIdx = -1;
    for (var i = 0; i < this.data.favoriteList.length; i++) {
      var obj = this.data.favoriteList[i];
      if (obj.subId == (data.subId)) {
        console.log('  find:' + id + ' has already exist!');
        console.log(data);
        alreadyInFavoritePosIdx = i;
        break;
      }
    }

    console.log('  alreadyInFavoritePosIdx:' + alreadyInFavoritePosIdx);

    var list = [];
    if (alreadyInFavoritePosIdx < 0) {
      list.push(data);
      for (var i in this.data.favoriteList) {
        list.push(this.data.favoriteList[i]);
      } 
      this.data.favoriteList = list;
    } else if (alreadyInFavoritePosIdx == 0) {
      //no need update.
    } else {
      list.push(data);
      for (var i in this.data.favoriteList) {
        if (i == alreadyInFavoritePosIdx) {
          continue;
        }
        list.push(this.data.favoriteList[i]);
      }
      this.data.favoriteList = list;
    }

    console.log(this.data.favoriteList);
    wx.setStorage({
      key: 'favoriteList',
      data: this.data.favoriteList,
    });
  },  

  loadFavoriteCategory: function () {
    console.log('loadFavoriteCategory');
    var that = this;
    wx.getStorage({
      key: 'favoriteCategorySubLevels',
      success: function (res) {
        console.log("获取 favoriteCategorySubLevels 数据成功:");
        that.data.favoriteCategory.subLevel = res.data;
        console.log(that.data.favoriteCategory);

        that.loadDataList();
      },
      fail: function (res) {
        console.log("获取 favoriteCategorySubLevels 数据失败");
        that.loadDataList();
      }
    });
    console.log('loadFavoriteCategory end-----');
  },

  loadFavoriteStudyCategory: function () {
    console.log('loadFavoriteStudyCategory');
    var that = this;
    wx.getStorage({
      key: 'favoriteStudyCategorySubLevels',
      success: function (res) {
        console.log("获取 favoriteStudyCategorySubLevels 数据成功:");
        that.data.favoriteStudyCategory.subLevel = res.data;
        console.log(that.data.favoriteStudyCategory);

        that.loadStudyDataList();
      },
      fail: function (res) {
        console.log("获取 favoriteStudyCategorySubLevels 数据失败");
        that.loadStudyDataList();
      }
    });
    console.log('loadFavoriteStudyCategory end-----');
  },

  loadFavoritePKCategory: function () {
    console.log('loadFavoritePKCategory');
    var that = this;
    wx.getStorage({
      key: 'favoritePKCategorySubLevels',
      success: function (res) {
        console.log("获取 favoritePKCategorySubLevels 数据成功:");
        that.data.favoritePKCategory.subLevel = res.data;
        console.log(that.data.favoritePKCategory);

        that.loadPKDataList();
      },
      fail: function (res) {
        console.log("获取 favoritePKCategorySubLevels 数据失败");
        that.loadPKDataList();
      }
    });
    console.log('loadFavoritePKCategory end-----');
  },

  loadStudyDataList: function () {
    console.log('loadStudyDataList');
    this.data.categoryStudyTree = [];

    if (this.data.favoriteStudyCategory.subLevel.length > 0) {
      this.data.categoryStudyTree.push(this.data.favoriteStudyCategory);
    }
    for (var i in app.globalData.categoryStudyTree) {
      this.data.categoryStudyTree.push(app.globalData.categoryStudyTree[i]);
    }
    this.setData({
      favoriteStudyCategory: this.data.favoriteStudyCategory,
      favoriteStudyList: this.data.favoriteStudyList,
      categoryStudyTree: this.data.categoryStudyTree,
    });

    this.initData(topcategoryid, 4);
    console.log('loadFavoriteStudyList  end --------- list');
    console.log(this.data.categoryStudyTree);
  },

  loadPKDataList: function () {
    console.log('loadPKDataList');
    this.data.categoryPKTree = [];

    if (this.data.favoritePKCategory.subLevel.length > 0) {
      this.data.categoryPKTree.push(this.data.favoritePKCategory);
    }
    for (var i in app.globalData.categoryPKTree) {
      this.data.categoryPKTree.push(app.globalData.categoryPKTree[i]);
    }
    this.setData({
      favoritePKCategory: this.data.favoritePKCategory,
      favoritePKList: this.data.favoritePKList,
      categoryPKTree: this.data.categoryPKTree,
    });

    this.initData(topcategoryid, 2);
    console.log('loadFavoritePKList  end --------- list');
    console.log(this.data.categoryPKTree);
  },

  loadDataList: function () {
    console.log('loadDataList');
    this.data.categoryTree = []; 

    if (this.data.favoriteCategory.subLevel.length > 0) {
      this.data.categoryTree.push(this.data.favoriteCategory);
    }
    for (var i in app.globalData.categoryTree) {
      this.data.categoryTree.push(app.globalData.categoryTree[i]);
    }
    this.setData({
      favoriteCategory: this.data.favoriteCategory,
      favoriteList: this.data.favoriteList,
      categoryTree: this.data.categoryTree,
    });

    this.initData(topcategoryid, 1);
    console.log('loadFavoriteList  end --------- list');
  },

  findCategoryStudyItemById(id) {
    console.log('findCategoryStudyItemById id:'+id);
    for (var i = 0; i < this.data.categoryStudyTree.length; i++) {
      var twoLevel = this.data.categoryStudyTree[i].subLevel;
      for (var j = 0; j < twoLevel.length; j++) {
        var _obj = twoLevel[j];
        if (_obj.id == id) {
          return _obj;
        }
      }
    }
  },

  findCategoryPKItemById(id) {
    console.log('findCategoryPKItemById id:' + id);
    for (var i = 0; i < this.data.categoryPKTree.length; i++) {
      var twoLevel = this.data.categoryPKTree[i].subLevel;
      for (var j = 0; j < twoLevel.length; j++) {
        var _obj = twoLevel[j];
        if (_obj.id == id) {
          return _obj;
        }
      }
    }
  },

  findCategoryItemById(id) {
    console.log('findCategoryItemById id:' + id);
    for (var i = 0; i < this.data.categoryTree.length; i++) {
      var twoLevel = this.data.categoryTree[i].subLevel;
      for (var j = 0; j < twoLevel.length; j++) {
        var _obj = twoLevel[j];
        if (_obj.id == id) {
          console.log('find _obj');
          console.log(_obj);
          return _obj;
        }
      }
    }
  },

})