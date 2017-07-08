  
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


//index.js
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
