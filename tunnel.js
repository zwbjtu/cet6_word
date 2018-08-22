/**
 * 小程序配置文件
 */

var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
const app = getApp()
var tunnel = {
  tunnelServer:{
   tunnelObj:null,
   connectCb:null,
   matchSuccessCb:null,
   receiveQuestionCb:null,
   tunnelStatusCb:null,
   status:-1,
  },

  createTunnel:function(){
    if (this.tunnelServer.tunnelObj == null){
      var that = this;
      var tunnel = new qcloud.Tunnel(config.service.tunnelUrl);
      console.log('create tunnel:')
      console.log(tunnel)
      tunnel.on('connect', () => that.tunnelConnect());
      tunnel.on('close', () => that.tunnelDisconnect());
      tunnel.on('reconnecting', () => that.tunnelReconnecting());
      tunnel.on('reconnect', () => that.tunnelReconnect());
      tunnel.on('error', error => that.tunnelError());
      this.tunnelServer.tunnelObj = tunnel;
      this.tunnelServer.status = 0;
    }
    console.log(this.tunnelServer.tunnelObj);
    return this.tunnelServer.tunnelObj;
  },

  beginMatch: function (id) {
    console.log('beginMatch, openId:' + app.globalData.openId+',id:'+id);
    this.tunnelServer.tunnelObj.emit('beginMatch', {//发起匹配
      openId: app.globalData.openId,
      sortId: id,
      //friendsFightingRoom: null//匹配者含friendsFightingRoom则说明是好友之间的匹配
    })
  },

  fightingResult:function(finish){
    this.tunnelServer.tunnelObj.emit('fightingResult', {//通知服务器关闭房间
      isfinish: finish,
      openId: app.globalData.openId,
    })
  },

  listenMatchSuccess: function (cb) {
    var that = this;
    this.tunnelServer.tunnelObj.on('matchNotice', (res) => {//PING-PONG机制:监听服务器PING
      console.log("receive matchSucess")
      console.log(res)
      if (this.tunnelServer.matchSuccessCb != null){
        this.tunnelServer.matchSuccessCb(res);
      }
    })
  },

  setListenQuestion:function(cb){
    this.tunnelServer.receiveQuestionCb = cb
  },
  setMatchSuccessCb: function (cb) {
    this.tunnelServer.matchSuccessCb = cb
  },
  
  setListentunnelStatusCb:function(cb){
    this.tunnelServer.tunnelStatusCb =cb;
  },
  listenQuestion: function (cb) {
    console.log('enter listenQuestion!')
    this.tunnelServer.tunnelObj.on('sendQuestion', (res) => {
      console.log('receive question:')
      console.log(res)
      if (this.tunnelServer.receiveQuestionCb != null)
        this.tunnelServer.receiveQuestionCb(res);
    })
  },

  listenGetAnswer:function(cb){
    if (this.tunnelServer.tunnelObj != null || this.tunnelServer.status != 2) {
    this.tunnelServer.tunnelObj.on('getAnswer', (res) => {
      console.log('receive get answer:')
      console.log(res)
      cb(res);
    })
    } else {
      console.log(' tunnel is close or abort status:' + this.tunnelServer.status);
    }
  },

  uploadAnswer: function (answer, score){
    if (this.tunnelServer.tunnelObj != null || this.tunnelServer.status != 2) {
      this.tunnelServer.tunnelObj.emit('answer', {//发起匹配
        roomName: app.globalData.userInfo1.roomName,
        choice: {
          openId: app.globalData.openId,
          userChoose: answer,
          scoreMyself: score,
        }
      })
    }else{
      console.log(' tunnel is close! answer:'+answer+', score:'+score);
    }
  },

  closeTunnel: function () {
    if (this.tunnelServer.tunnelObj != null){
      this.tunnelServer.status = -1;
      this.tunnelServer.tunnelObj.close();
      this.tunnelServer.receiveQuestionCb = null;
      this.tunnelServer.tunnelStatusCb = null;
    }
  },

  keepConnect:function(){
    if (this.tunnelServer.tunnelObj != null || this.tunnelServer.status != 2) {
    this.tunnelServer.tunnelObj.on('PING', () => {//PING-PONG机制:监听服务器PING
      console.info("receive PING")
      this.tunnelServer.tunnelObj.emit('PONG', {//给出回应
        openId: app.globalData.openId
      })
      console.info("send PONG")
    })
    }else{
      console.log(' tunnel is close or abort status:' + this.tunnelServer.status);
    }
  },

  listenRunawayNotice:function(cb){
    if (this.tunnelServer.tunnelObj != null || this.tunnelServer.status != 2) {
      this.tunnelServer.tunnelObj.on('runawayNotice', (res) => {
        console.log('receive runawayNotice:')
        console.log(res)
        cb(res);
      })
    }else{
      console.log(' tunnel is close or abort status:' + this.tunnelServer.status);
    }
  },

  sendMessage:function(type, who){
    tunnel.emit('speak', { word: type, who: { nickName: who } });
  },

  tunnelConnect:function(){
    this.keepConnect();
    console.log('WebSocket 信道已连接')
    this.tunnelServer.status = 1;
    if (this.tunnelServer.tunnelStatusCb != null)
      this.tunnelServer.tunnelStatusCb(this.tunnelServer.status);    
  },

  tunnelDisconnect: function () {
    console.log('WebSocket 信道已断开')
    this.tunnelServer.status = 2;
    this.showTunnelStatus('信道已断开');
    if (this.tunnelServer.tunnelStatusCb != null && this.tunnelServer.tunnelObj != null)
      this.tunnelServer.tunnelStatusCb(this.tunnelServer.status);
  },
  tunnelReconnecting: function () {
    console.log('WebSocket 信道正在重连...')
    this.tunnelServer.status = 3;
    if (this.tunnelServer.tunnelStatusCb != null && this.tunnelServer.tunnelObj != null)
      this.tunnelServer.tunnelStatusCb(this.tunnelServer.status);
  },
  tunnelReconnect:function(){
    console.log('WebSocket 信道重连成功')
    this.tunnelServer.status = 4;
    if (this.tunnelServer.tunnelStatusCb != null && this.tunnelServer.tunnelObj != null)
      this.tunnelServer.tunnelStatusCb(this.tunnelServer.status);
  },
  tunnelError: function () {
    console.error('信道发生错误')
    this.tunnelServer.status = 5;
    this.showTunnelStatus('信道发生错误');
    if (this.tunnelServer.tunnelStatusCb != null &&  this.tunnelServer.tunnelObj != null)
      this.tunnelServer.tunnelStatusCb(this.tunnelServer.status);
  },
  showTunnelStatus: function (str) {
    if (this.tunnelServer.tunnelObj != null && this.tunnelServer.status >= 0){
      wx.showToast({
        title: str,
      })
    }
  },
};

module.exports = tunnel;