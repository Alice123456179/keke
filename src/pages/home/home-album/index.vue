<template>
  <scroll-view scroll-y @scrolltolower="handle" class="albumHeight">
    <!-- 轮播图 -->
    <view class="banner">
      <swiper
        autoplay
        indicator-dots
        circular
      >
        <swiper-item
          v-for="item in banner"
          :key="item.id"
        >
          <image mode="widthFix" :src="item.thumb" alt="">
        </swiper-item>
      </swiper>
    </view>
    <!-- 专辑内容 -->
    <view class="albumWrap">
      <navigator class="albumInner"
        v-for="item in album"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="albumLeft">
          <image mode="aspectFill" :src="item.cover" alt="" />
        </view>
        <view class="albumRight">
          <view class="albumName">{{item.name}}</view>
          <view class="albumDescription">{{item.desc}}</view>
          <view class="albumButton">
            <view class="button">+关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>
<script>
export default {
  data(){
    return {
      dataForm:{
        limit:30,
        order:'new',
        skip:0
      },
      banner:[],
      album:[],
      hasMore:true
    }
  },
  mounted(){
    this.initData()
    uni.setNavigationBarTitle({title:'专辑'})
  },
  methods:{
    initData(){
      this.request({
        url:'http://157.122.54.189:9088/image/v1/wallpaper/album',
        data:this.dataForm
      }).then(res=>{
        // console.log(res)
        if(this.banner.length === 0){
          this.banner = res.res.banner
        }
        if(res.res.album.length===0){
          this.hasMore = false
        }
        this.album = [...this.album,...res.res.album]
      })
    },
    handle(){
      if(this.hasMore){
        this.dataForm.skip += this.dataForm.limit
        this.initData()
      }else{
        uni.showToast({
          title:'没有数据了',
          icon:'none'
        })
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.albumHeight{
  height:calc(100vh - 36px);
}
.banner{
  swiper{
    height: 326.1rpx;
    image{
      height: 100%;
    }
  }
}
.albumInner {
  display: flex;
  padding: 10rpx 0;
  border-bottom: 1px solid #ccc;
  .albumLeft {
    flex: 1;
    padding: 0 10rpx;
    image {
      width:200rpx;
      height:200rpx;
    }
  }

  .albumRight {
    flex: 2;
    padding:0 10rpx;
    overflow: hidden;
    .albumName {
      padding: 10rpx 0;
      color: black;
      font-size: 30rpx;
    }
    .albumDescription {
      padding: 10rpx 0;
      font-size:24rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      
    }

    .albumButton {
      padding:10rpx;
      display: flex;
      justify-content: flex-end;
      .button {
        padding: 10rpx;
        border: 2rpx solid $color;
        font-size:30rpx;
        color:$color;
      }
    }
  }
}
</style>