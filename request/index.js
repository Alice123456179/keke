let times = 0
export const request = (params)=>{
  times++
  wx.showLoading({
    title: "加载中",
    mask: true, //是否显示蒙版
  });
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data.message)
      },
      error:(err)=>{
        reject(err)
      },
      complete:()=>{
        times--
        if(times===0){
          wx.hideLoading()
        }
      }
    })

  })
}