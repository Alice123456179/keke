<template>
  <view class="albumWrap">
    <!-- 专辑图片 -->
    <view class="albumTop">
      <view class="albumTopImg">
        <image :src="album.cover" mode="widthFix" alt="">
      </view>
      <view class="albumInfo">
        <view class="only">{{album.name}}</view>
        <view class="btn">关注专辑</view>
      </view>
    </view>
    <!-- 专辑作者信息 -->
    <view class="albumAuthor">
      <view class="userInfo">
        <image mode="widthFix" :src="album.user.avatar" alt="">
          <view class="userName">{{album.user.name}}</view>
      </view>
      <view class="userDesc">
       <text> {{album.desc}}</text>
      </view>
    </view>
    <!-- 专辑图片 -->
    <view class="albumPicWrap">
      <view class="albumPicInner"
        v-for="(item,index) in wallpaper"
        :key="item.id"
      >
       <go-detail :list ='wallpaper' :index='index'>
        <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)" alt="">
        </go-detail>
      </view>
    </view>
  </view>
</template>
<script>
import goDetail from '@/components/goPicDetail'

export default {
  components:{
    goDetail
  },
  data(){
    return {
      id:-1,
      dataForm:{
        skip:0,
        limit:30,
        order:'new',
        first:1
      },
      album:{},
      wallpaper:[],
      hasMore:true
    }
  },
  onLoad(options){
    this.id = options.id
    // this.id = '5e5cf679e7bce739db1281e4'
    this.initData()
    // console.log(this.id)
  },
  onReachBottom(){
    // this.dataForm.first = 0
    if(this.hasMore){
      this.dataForm.skip += this.dataForm.limit
      this.initData()
    }else{
      uni.showToast({
        title:'没有数据了！',
        icon:'none',
        mask:true
      })
    }
  },
  methods:{
    initData(){
      this.request({
        url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data:this.dataForm
      }).then(res=>{
        // console.log( res.res)
        if(Object.keys(this.album).length === 0){
           this.album = res.res.album
           this.dataForm.first = 0
        }
        if(res.res.wallpaper.length===0){
          this.hasMore = false
          uni.showToast({
            title:'没有数据了！',
            icon:'none',
            mask:true
          })
        }
        this.wallpaper = [...this.wallpaper,...res.res.wallpaper]
      })
    }
  }
}
</script>
<style scoped lang='scss'>
.albumWrap{
  height:calc(100vh - 36px);
}
.albumTop{
  position: relative;
  .albumInfo{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    padding: 0 15rpx;
    .only{
      font-size: 40rpx;
      color: white;
     
    }
    .btn{
      height: 60rpx;
      width:152rpx;
      background: $color;
      color: white;
      border-radius: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
    }
  }
  
}
.albumAuthor {
  padding: 20rpx;
  .userInfo {
    display: flex;
    align-items: center;
    padding-bottom: 10rpx;

    image {
      width: 50rpx;
    }

    .userName {
      color: black;
      font-size: 34rpx;
      margin-left: 15rpx;
    }
  }
  .userDesc {
    color:grey;

  }
}
.albumPicWrap{
  display: flex;
  flex-wrap: wrap;
  .albumPicInner{
    width: 33.33%;
    border: 4rpx solid white;
    image{
      height: 160rpx;
    }
  }
}
</style>