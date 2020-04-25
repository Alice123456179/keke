// pages/auth/index.js
import {request} from "../../request/index"
Page({
  data(){
    return{
      code:'',
    }
  },
  getUserInfo(e){
    // console.log(e)
    const {encryptedData,rawData,iv,signature} = e.detail
    wx.login({
      timeout:10000,
      success: (result)=>{
        // console.log(result)
        const {code} = result
        this.setData({
          code
        })
      },
    });
    let {code} = this.data
    const loginParams = {encryptedData,rawData,iv,signature,code}
    request({url:'/users/wxlogin',data:loginParams,method:'POST'}).then(res=>{
      console.log(res)
    })
  }
})