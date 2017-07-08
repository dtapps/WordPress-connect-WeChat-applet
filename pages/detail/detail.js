  
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


//获取应用实例
var app = getApp()
var WxParse = require('../../vender/wxParse/wxParse.js');
Page({
  data: {
    art: {}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: ''
    })
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.serverUrl + '?json=get_post&id=' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
         var content = res.data.post.content;
         WxParse.wxParse('content', 'html', content, that,5);
         that.setData({
           info: res.data.post
         })
      }
    })
  }
})