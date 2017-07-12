/*
 * 
 * WordPress连接微信小程序
 * 作者 (author): 李光春 部分代码二次开发，谢谢好心人提醒（特别是那种使用别人的代码，而传说中的原来的作者代码也和别人的一样  （/笑脸）） （谁真谁假）
 * 详述 (detail)：https://liguangchun.cn/26
 * 码云 (oschina)：http://git.oschina.net/aizhinengnet/wordpress-connect-wechat-applet
 * GitHub: https://github.com/GC0202/WordPress-connect-WeChat-applet
 * 码云 (Gitee)：https://gitee.com/aizhinengnet/wordpress-connect-wechat-applet
 * 码市 (Coding)：https://coding.net/liguangchun/WordPress-connect-WeChat-applet
 * 阿里云 (aliyun): https://code.aliyun.com/GC/WordPress-connect-WeChat-applet
 * CSDN: https://code.csdn.net/qq_25745249/wordpress-connect-wechat-applet
 * GitLab：https://gitlab.com/liguangchun/WordPress-connect-WeChat-applet.git
 * cooperation：https://www.oschina.net/p/wordpress-connect-wechat-applet
 * 技术支持微信号：GC19980202
 * The MIT License (MIT)
 * Copyright (c) 2017 李光春
 * 
 */

//pages/detail/detail.js
var app = getApp()
var WxParse = require('../../vender/wxParse/wxParse.js');
Page({
  data: {
    art: {},
    userInfo: {}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '李光春' //文章页面的标题
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad: function (options) {
  console.log('onLoad')
  var that = this
  //调用应用实例的方法获取全局数据
  app.getUserInfo(function (userInfo) {
    //更新数据
    that.setData({
      userInfo: userInfo
    })
  })
	//文章内容
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
  },  
  onShareAppMessage: function () {
    return {
      title: this.data.userInfo.nickName + ' 推荐：' + this.data.info.title, //推荐前面是用户名字，推荐后面是文章的标题
      path: '/pages/detail/detail?id=' + this.data.info.id, //请不要修改这里
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})