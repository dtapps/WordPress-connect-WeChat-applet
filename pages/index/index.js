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

//pages/index/index.js
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    noMore: false,
    plain: false
  },
  //事件处理函数
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad: function () {
    this.index = 1;
    this.noMore = false;
    var that = this;
    //首页文章数据
    wx.request({
      url: app.serverUrl + '?json=get_posts&page=' + that.index,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
         that.setData({
           list: res.data.posts
         })
      }
    });
    //首页轮换图数据
    wx.request({
      url: app.serverUrl + '?json=get_category_posts&id=3',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
         that.setData({
           banner: res.data.posts
         })
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '李光春个人博客', //分享首页的标题
      path: '/pages/index/index',
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
      var that = this
      that.nextPage = that.index + 1;
      if(that.noMore == false){
          that.setData({ loading: true });
          wx.request({
            url: app.serverUrl + '?json=get_posts&page=' + that.nextPage,
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
