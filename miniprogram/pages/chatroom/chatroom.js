// pages/chatroom/chatroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [{
      avatar: "https://img1.baidu.com/it/u=1649870184,1202548445&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360",
      name: "云淡风轻",
      date: "2021-03-02",
      content: '请问大家天气潮湿，骨头酸痛该怎么治疗保养？',
      comment_number: 12,
      like_number: 16,
    },
    {
      avatar: "https://img2.baidu.com/it/u=3852715372,709456915&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      name: "健康富贵",
      date: "2021-03-02",
      content: '请问北京306医院刘建柱医生如何？',
      comment_number: 7,
      like_number: 5,
    },
    {
      avatar: "https://img2.baidu.com/it/u=187794571,112597061&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      name: "天道酬勤",
      date: "2021-03-02",
      content: '123123131231231231233123123123123123123123123123133123123123131321312313212313213',
      comment_number: 22,
      like_number: 30,
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  
  // 添加话题的回调事件
  addTopic() {
    // 转到发布话题的页面
    // console.log('addTopic')
  }
})