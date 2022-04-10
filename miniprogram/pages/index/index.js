//index.js
const app = getApp()
const db = wx.cloud.database()
// 获取校验登录的中间件
let check_login = require("../../utils/util");

// 在页面加载过程中使用自定义的中间件来验证用户是否登录，
// 如果未登录，会默认跳转到个人中心页面提醒用户授权登录
Page(check_login.checkLogin({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    loginFlag: false,

    searchClass: "",

    searchKey: '',

    doctor_info: [],
    doctor_info_index: "",


    department: [
      {
        tag: "皮肤用药",
        icon: "pifuke color1"
      }, {
        tag: "瘦身减肥",
        icon: "tuina color2"
      }, {
        tag: "风湿骨科",
        icon: "guke color3"
      }, {
        tag: "感冒咳嗽",
        icon: "erbihouke color4"
      },
    ],
    location: '点击查询医院'
    
  },

  onLoad: function() {
    // console.log(1)
  },
  onShow: function() {
    // console.log(0)

  },
  onReady: function() {
    // 调用云数据库，从doctor_info表中获取到医生信息列表并保存到客户端
    db.collection("doctor_info")
    .get()
    .then(res => {
      console.log(res)
      this.setData({
        doctor_info: res.data
      });
    });

  },
  /**
   * 搜索栏聚焦事件的回调函数
   */
  searchFocus: function() {
    // 如果用户点击了搜索栏，改变搜索栏的样式，使搜索栏上移 并且虚化其他部分
    this.setData({
      searchClass: "inputFocus"
    });
  },
  /**
   * 搜索栏失焦事件的回调函数
   */
  searchBlur: function() {
    // 将搜索栏样式还原
    this.setData({
      searchClass: ""
    })
  },

  // 获取用户输入的内容
  searchInput(e) {
    this.setData({
      searchKey: e.detail.value,
    });
  },

  // 搜索事件
  search(e) {
    wx.navigateTo({
      url: '../healthProducts/healthProducts?tag=' + this.data.searchKey,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {
        console.log(res)
      },
    })
  },

  /**
   * 用户点击医生缩略信息的回调函数
   */
  selectDoctor(event) {
    // 如果用户点击了某位医生的缩略信息（头像或姓名），那么改变index索引为用户选择的医生的编号的索引值，来将医生的详细信息展示到页面上
    const index = event.currentTarget.dataset.index;
    this.setData({
      doctor_info_index: index
    });
  },

  // 获取位置信息,(调用地图)
  getLocation() {
    const that = this
    wx.chooseLocation({
        success: (res) => {
            console.log(res)
            // 将用户选择的地址存入缓存中
            wx.setStorageSync('location', res.address+'-'+res.name)
            that.setData({
                location: res.address+'-'+res.name
            })
        },
        fail: () => {},
        complete: () => {}
    });
      
  },
  consult() {
    console.log("consult");
  },
  handleContact() {
    console.log('handleContact')
    wx.cloud.callFunction({
      name: 'autoReply_text'
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },



}))
