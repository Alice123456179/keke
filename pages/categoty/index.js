import { request } from "../../request/index"
Page({
  data: {
    leftMenu:[],
    rightMenu:[],
    currentIndex:0,
    scrollTop:0
  },
  cate:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if(!Cates){
    this.getCate()
    }else{
      if(Date.now()-Cates.time>1000*50){
        this.getCate()
      }else{
        this.cate = Cates.data
        let leftMenu = this.cate.map(v=>v.cat_name)
        let rightMenu = this.cate[0].children
        this.setData({
          leftMenu,
          rightMenu
        })
      }
    }

  },
  getCate(){
    request({
      url:'/categories'
    })
    .then(res=>{
      // console.log(res.data.message)
      this.cate = res
      wx.setStorageSync('cates', {time:Date.now(),data:this.cate});
      let leftMenu = this.cate.map(v=>v.cat_name)
      let rightMenu = this.cate[0].children
      this.setData({
        leftMenu,
        rightMenu
      })
    })
  },
  leftChange(e){
    const { index } = e.currentTarget.dataset
    let rightMenu = this.cate[index].children
    this.setData({
      currentIndex:index,
      rightMenu,
      scrollTop:0
    })
  }

})