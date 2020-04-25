//Page Object
import { request } from '../../request/index.js'
Page({
  data: {
    swiperList:[],
    navList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList()
    this.getNavBarList()
    this.getFloorList()
    
  },
  // 获取轮播图
  getSwiperList(){
    request({
      url:'/home/swiperdata'
    })
    .then(res=>{
      this.setData({
        swiperList:res
      })
    })
  },
  // 获取导航
  getNavBarList(){
    request({
      url:'/home/catitems'
    })
    .then(res=>{
      // console.log(res)
      this.setData({
        navList:res
      })
    })
  },

  // 获取楼层
  getFloorList(){
    request({
      url:'/home/floordata'
    })
    .then(res=>{
      // console.log(res.data.message)
      this.setData({
        floorList:res
      })
    })
  }

 
});