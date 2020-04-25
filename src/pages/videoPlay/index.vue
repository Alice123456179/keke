<template>
  <view class="play">
    <img :src="videoObj.img" alt="">
    <view class="icon">
      <view @click="handleShengyin" :class="['iconfont',muted?'iconjingyin':'iconshengyin']"></view>
      <view class="iconfont iconzhuanfa">
        <button open-type="share"></button>
      </view>
    </view>
    <view class="videoContent">
      <video :muted='muted' :src="videoObj.video" objectFit="fill"></video>
    </view>
    <view class="btn">
      <view class="btnContent" @click="download">下载视频</view>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return {
      videoObj:{},
      muted:false
    }
  },
  onLoad(){
    // console.log(getApp().globalData.video)
    this.videoObj = getApp().globalData.video
  },
  methods:{
    handleShengyin(){
      this.muted = !this.muted
    },
    async download(){
      await uni.showLoading({title:'加载中'});
      const {tempFilePath} = (await uni.downloadFile({url:this.videoObj.video}))[1];
      await uni.saveVideoToPhotosAlbum({filePath:tempFilePath});
      uni.hideLoading();
      await uni.showToast({title:'下载成功'});
    }
  }

}
</script>

<style scoped lang='scss'>
.play {
  position: relative;
  image {
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    filter: blur(20rpx);

  }

  .icon {
    height: 80rpx;
    display: flex;
    justify-content: flex-end;
    .iconfont {
      width: 80rpx;
      color: white;
      font-size: 50rpx;
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,.4);
      margin-right: 20rpx;
    }
    .iconzhuanfa{
      position: relative;
      button{
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
      }
    }
  }

  .videoContent {
    display: flex;
    justify-content: center;
    video {
      width: 360rpx;
      height: 600rpx;
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    .btnContent {
      border-radius: 40rpx;
      width: 360rpx;
      height: 80rpx;
      background:rgba(0,0,0,.4);
      color: white;
      font-size: 40rpx;
      margin-top: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2rpx solid white;

    }
  }
}
</style>