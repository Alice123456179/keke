import { showToast,showModel } from "../../utils/syncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    totalPrice:0,
    checkedCart:[],
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart')||[]
    // let allCheck = cart.length?cart.every(v=>v.checked):false
    cart = cart.filter(v=>v.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v=>{
        totalPrice += v.num*v.goods_price
        totalNum += v.num
    })
    this.setData({
      cart,
      address,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('cart',cart)
  },
  handlePay(){
    const token = wx.getStorageSync('token') || ''
    if(token){
      console.log(token)
    }else{
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }
  }
})