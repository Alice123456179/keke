import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goodsList:[]
  },
  dataForm:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.dataForm.cid = options.cid
    this.getList()
  },
  // 下拉刷新
  onReachBottom(){
    if(this.dataForm.pagenum >= this.totalPages){
      // console.log('ert')
      wx.showToast({title: '没有下一页数据了！'});
    }else{
      this.dataForm.pagenum++
      this.getList()
    }
  },
  // 上拉刷新
  onPullDownRefresh(){
      console.log('434')
      this.setData({
        goodsList:[]
      })
      this.dataForm.pagenum = 1
      this.getList()
      wx.stopPullDownRefresh()

  },
  // 获取商品列表
  getList(){
    request({
      url:'/goods/search',
      data:this.dataForm
    })
    .then(res=>{
      console.log(res)
      let {goods} = res
      const total = res.total
      this.totalPages = Math.ceil(total/this.dataForm.pagesize)
      // console.log(this.totalPages)
      this.setData({
        goodsList:[...this.data.goodsList,...res.goods]
      })
    })
    

  },
  handleChange(e){
    // console.log(e)
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  }


})