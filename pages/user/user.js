  
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


//user.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello ! WelCome to WeChat applet',
    islogin: false,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.accesstoken){
      that.setData({ islogin:true });
    }
    console.log(CuserInfo)

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
