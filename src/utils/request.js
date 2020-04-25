export default (params) => {
  uni.showLoading({
    title: '加载中',
    mask: true,
  });
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      success: (result)=>{
        resolve(result.data)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{
        uni.hideLoading();
      }
    });
  })
}