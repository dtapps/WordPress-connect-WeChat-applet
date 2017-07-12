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

//pages/theme/applet.js
var app = getApp();
Page({
    data: {
      list: []
    },
    onPullDownRefresh: function () {
      wx.stopPullDownRefresh()
    },
    onLoad: function () {
      this.index = 1;
      this.noMore = false;
      var that = this;
      wx.request({
        url: app.serverUrl + '?json=get_category_posts&id=3&page=' + that.index,
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            list: res.data.posts
          })
        }
      })
    },
    onShareAppMessage: function () {
      return {
        title: '微信小程序开发教程',
        path: '/pages/theme/applet',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    },
      //加载更多
      onReachBottom: function() {
          var that = this;
          that.nextPage = that.index + 1;
          if(that.noMore == false){
            that.setData({ loading: true });
            wx.request({
              url: app.serverUrl + '?json=get_category_posts&id=3&page=' + that.nextPage,
              headers: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                 if(res.data.count != 0){
                     that.setData({
                       loading: false,
                       list: that.data.list.concat(res.data.posts),
                     });
                 } else {
                     that.setData({
                       loading: false,
                       noMore: true,
                     });
                 }
              }
            });
            that.index++;
          }
      }
})