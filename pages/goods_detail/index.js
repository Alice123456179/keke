import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{}
  },
  goodsPics:{},
  goodsDetail:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getDetail(goods_id)

  },
  getDetail(goods_id){
    request({url:'/goods/detail',data:{goods_id}})
    .then(res=>{
      this.setData({
        goods:{
          goods_id:res.goods_id,
          goods_price:res.goods_price,
          pics:res.pics,
          goods_name:res.goods_name,
          goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg')
        }
      })
      this.goodsPics = res.pics
      this.goodsDetail = res
      // console.log(this.goodsDetail)
    })
  },
  // 预览图片
  privewTap(e){
    const pics = this.goodsPics.map(v=>v.pics_mid)
    // console.log(e)
    const {url} = e.currentTarget.dataset
    // console.log(pics)
    wx.previewImage({
      current:url,
      urls: pics,
    })
  },
  // 加入购物车
  addCart(){
    let cart = wx.getStorageSync('cart')||[]
    // console.log(cart)
    if(cart){
      let index = cart.findIndex(v=>v.goods_id === this.goodsDetail.goods_id)
      // console.log(index)
      if(index===-1){
        this.goodsDetail.num = 1
        this.goodsDetail.checked = true
        cart.push(this.goodsDetail)
      }else{
        cart[index].num++
      }
    }else{
      this.goodsDetail.num = 1
      cart.push(this.goodsDetail)
    }
    
    wx.setStorageSync('cart',cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
      
  }
})