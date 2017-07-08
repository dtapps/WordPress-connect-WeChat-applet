  
/*
 * 
 * WordPress连接微信小程序
 * author: 李光春
 * detail：https://liguangchun.cn/26
 * oschina：http://git.oschina.net/aizhinengnet/wordpress-connect-wechat-applet
 * github: https://github.com/GC0202/WordPress-connect-WeChat-applet
 * coding：https://git.coding.net/liguangchun/WordPress-connect-WeChat-applet
 * 技术支持微信号：GC19980202
 * 开源协议：MIT
 * Copyright (c) 2017 https://liguangchun.cn All rights reserved.
 * 
 */


//app.js
App({
  serverUrl:'https://liguangchun.cn/', //你的网站
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})