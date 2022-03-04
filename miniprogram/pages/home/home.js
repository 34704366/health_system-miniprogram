//index.js
const app = getApp()
// 获取校验登录的中间件
let check_login = require("../../utils/util");

// 在页面加载过程中使用自定义的中间件来验证用户是否登录
Page(check_login.checkLogin({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    loginFlag: false,
    nickName: '请登录',

    version: '1.0.0'
  },

  onLoad: function() { 
    console.log('onLoad')
  },
  onShow: function() {
    // 检测切换登录状态
    const userInfo = wx.getStorageSync('userInfo');
    const loginFlag = wx.getStorageSync('loginFlag');
    console.log(userInfo)
    console.log(loginFlag)
    if (loginFlag == true && userInfo.nickName) {
      this.setData({
        userInfo: userInfo,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        loginFlag: true
      })
    }
    
  },
  getUserProfile() {
    // 使用微信封装好的函数 wx.getUserProfile()来让用户登录
    wx.getUserProfile({
      desc: '登录该系统', 
      success: (res) => {
        console.log(res)
        // 获取用户的信息并保存下来
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          userInfo: res.userInfo,
          loginFlag: true,
        })
        wx.setStorageSync('userInfo', res.userInfo);
        wx.setStorageSync('loginFlag', true);
      }
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        console.log(res)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  userLogin() {
    // 用户登录
    this.onGetOpenid();
    // 获取用户信息（弹窗提醒）
    this.getUserProfile();
  }

}))
