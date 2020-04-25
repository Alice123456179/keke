// 获取权限
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
// 打开权限
export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
// 获取地址
export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

// 弹窗提示
export const showModel= (content) =>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title:'提示',
      content:content,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

// Toast
export const showToast= ({title}) =>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title:title,
      icon:'none',
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}