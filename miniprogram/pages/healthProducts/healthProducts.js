// pages/healthProducts/healthProducts.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    tag: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tag = options.tag;
    this.setData({
      tag: tag,
    });
    db.collection('products')
    .where({
      name: db.RegExp({
        // 用正则表达式查询
        regexp: this.data.tag
      })
    })
    .get()
    .then(res => {
      console.log(res);
      if(res.data.length == 0) {
        db.collection('products')
        .where({
          tag : db.RegExp({
            regexp: this.data.tag
          })
        })
        .get()
        .then(res => {
          this.setData({
            products: res.data,
          });
        })
      }
      this.setData({
        products: res.data,
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
    this.setData({
      tag: this.data.searchKey,
    });
    
    // 丛数据库中查询指定的内容
    db.collection('products')
    .where({
      name: db.RegExp({
        regexp: this.data.tag
      })
    })
    .get()
    .then(res => {
      console.log(res);
      if(res.data.length == 0) {
        db.collection('products')
        .where({
          tag : db.RegExp({
            regexp: this.data.tag
          })
        })
        .get()
        .then(res => {
          this.setData({
            products: res.data,
          });
        })
      }
      this.setData({
        products: res.data,
      });
    });
  },

  
})

let a = {
  name: "黑芝麻豆粉",
  title: "黑芝麻豆粉具有软化血管以及防止便秘等功效。黑芝麻豆粉中含有大量的维生素E，维生素E属于一种体内的抗氧化剂，可以清除血管内的垃圾，软化血管，预防心血管疾病，增加皮肤的弹性，延缓衰老。黑芝麻豆粉中含有丰富的膳食纤维，能够促进肠胃的蠕动，排出肠道内的垃圾，防止便秘，具有减肥和去痘的功效",
  products: [
    {
      image: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/6000000002400/O1CN01LANMI21TbFHEadgpX_!!6000000002400-0-picassoopen.jpg_460x460Q90.jpg_.webp',
      data: {
        "推荐产品" : "五谷磨房核桃芝麻黑豆粉",
        "养生功效" : '抗衰老，防便秘，软化血管，预防心血管疾病，增加皮肤弹力',
        '来源渠道' : '淘宝京东等在线商城皆有出售',
        '适用人群' : '老少皆宜'
      }
    }
  ],
  tag: "抗衰老，防便秘，软化血管，预防心血管疾病，增加皮肤弹力"
}

const b = {
  name: "粗粮",
  title: "粗粮里面含有大量的膳食纤维，可帮助肠道蠕动，排除毒素，预防便秘。每个人都知道纤维的重要，懂得多吃水果、蔬菜固然可以补充膳食纤维，却经常会忘记粗粮是膳食纤维的重要来源。粗粮当中的不溶性纤维对于促进肠道蠕动最有帮助，而且可以与食物中的多种污染物质相结合，将它们带出体外，并把肠道打扫得干干净净。",
  products: [
    {
      image: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2252324963/O1CN01o3SUlu1mX6PStBGi5_!!0-item_pic.jpg_460x460Q90.jpg_.webp',
      data: {
        "推荐产品" : "玉米",
        "养生功效" : '预防便秘，润肠通便，热量低可以减肥期间代餐',
        "热量" : "每100g包含热量210大卡",
        "适用人群" : "老少皆宜"
      }
    },
    {
      image: 'https://picasso.alicdn.com/imgextra/276ee3/O1CNA1Pimgrender276ee3O1CN01zllvJH2GlF7jMrDqx_!!0-item_pic.jpg?backup_url=O1CN01zllvJH2GlF7jMrDqx_!!0-item_pic.jpg&p_context=eyJiaXoiOiJhYWMiLCJidWNrZXRJZCI6IkIiLCJjaGFubmVsIjoid3NlYXJjaGljb24taXRlbSIsIml0ZW1JZCI6IjU2MTQ0MjIzMjcyNSIsInBpY1R5cGUiOiJwMTEiLCJyZW5kZXJDb25kaXRpb24iOnt9LCJyZW5kZXJEYXRhIjp7fX0-&sign=276ee3cee43981310a55725e686e24f6&v=4.0_460x460Q90.jpg_.webp',
      data: {
        "推荐产品" : "红薯",
        "养生功效" : '预防便秘，润肠通便',
        "热量" : "每100g包含热量130大卡",
        "适用人群" : "老少皆宜"
      }
    },
    {
      image: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2208566183199/O1CN01BfQ1Vh1ZVBiTrtDeV_!!0-item_pic.jpg_460x460Q90.jpg_.webp',
      data: {
        "推荐产品" : "土豆",
        "养生功效" : '补充钾，钾可以保护人的心脏，饱腹感高于粮食',
        "热量" : "每100g包含热量70大卡",
        "适用人群" : "老少皆宜"
      }
    }
  ],
  tag: "预防便秘，润肠通便，减脂减肥，排除毒素，玉米红薯土豆粗粮"
}