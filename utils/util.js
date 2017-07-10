/*
 * 
 * WordPress连接微信小程序
 * author: 李光春
 * detail：https://liguangchun.cn/26
 * oschina：http://git.oschina.net/aizhinengnet/wordpress-connect-wechat-applet
 * github: https://github.com/GC0202/WordPress-connect-WeChat-applet
 * coding：https://git.coding.net/liguangchun/WordPress-connect-WeChat-applet
 * aliyun: https://code.aliyun.com/GC/WordPress-connect-WeChat-applet.git
 * csdn: https://code.csdn.net/qq_25745249/wordpress-connect-wechat-applet.git
 * 技术支持微信号：GC19980202
 * 开源协议：MIT
 * Copyright (c) 2017 https://liguangchun.cn All rights reserved.
 * 
 */

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, split) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(split || '')
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate
}
