import { showToast,chooseAddress,getSetting,openSetting,showModel } from "../../utils/syncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allCheck:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart')||[]
    // let allCheck = cart.length?cart.every(v=>v.checked):false
    this.recheck(cart)
    this.setData({
      address,
    })
  },
  // 支付结算
  handlePay(){
    let {address,totalNum} = this.data
    // console.log(address)
    if(!address.name){
      showToast({title:'您还没有添加地址！'}).then(res=>{
        return;
      })
    }
    if(totalNum===0){
      showToast({title:'您还没有选购商品！'}).then(res=>{
        // console.log(res)
        return ;
      })
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });

  },
  // 商品选中
  handleCheck(e){
    // console.log(e)
    const {id} = e.currentTarget.dataset
    // console.log(id)
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id===id)
    // console.log(index)
    cart[index].checked = !cart[index].checked
    this.recheck(cart)
  },
  // 设置购物车状态，重新计算
  recheck(cart){
    let allCheck = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num*v.goods_price
        totalNum += v.num
      }else{
        allCheck = false
      }
    })
    allCheck = cart.length!=0?allCheck:false
    this.setData({
      cart,
      allCheck,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('cart',cart)

  },
  // 全选
  handleAllCheck(){
    let {allCheck} = this.data
    let cart = wx.getStorageSync('cart')
    allCheck = !allCheck
    cart.forEach(v=>v.checked = allCheck)
    this.recheck(cart)


  },
  // 改变商品数量
  changeNum(e){
    // console.log(e)
    let {id,num} = e.currentTarget.dataset
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num===1&&num===-1){
      let content = '您确定要删除此商品吗？'
      showModel(content).then(res=>{
        if(res.confirm){
          cart.splice(index,1)
          this.recheck(cart)
        }
      })
    }else{
    cart[index].num+=num
    }
    this.recheck(cart)
    wx.sho
  },
  // 选择地址
  chooseAddress(){
      getSetting().then(res=>{
        const flag = res.authSetting['scope.address']
        if(flag===false){
          openSetting()
        }
        chooseAddress().then(res=>{
          let addres = {
            addressInfo:res.provinceName+res.cityName+res.countyName+res.detailInfo,
            name:res.userName,
            phone:res.telNumber
          }
          wx.setStorageSync('address', addres);
        })
      })
    }
})