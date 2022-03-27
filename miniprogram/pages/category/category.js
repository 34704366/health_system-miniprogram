// pages/category/category.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    navList: [],
    itemList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用云数据库，从category表中获取到列表信息
    db.collection("category")
    .get()
    .then(res => {
      // console.log(res)
      this.setData({
        navList: res.data[0].navList,
        itemList: res.data[0].itemList
      });
    });
  },
  
  // 点击切换左边栏的事件
  switchLeftTab: function(e) {
    let index = parseInt(e.target.dataset.index);
    this.setData({
      curIndex: index,
    })
    // console.log(index);
  },
  
})