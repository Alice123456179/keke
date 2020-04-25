<template>
  <view class="picWrap">
    <view class="picTop">
      <view class="picAvatar">
        <image mode="widthFix" :src="imgDetail.user.avatar" alt="">
      </view>
      <view class="userInfo">
        <view class="picName">{{imgDetail.user.name}}</view>
        <view class="picTime">{{imgDetail.newTime}}</view>
      </view>
    </view>
    <!-- 高清大图 -->
    <view class="bigPic">
      <swiper-action @swiperAction="handleAction">
        <img :src="imgDetail.thumb" mode="widthFix" alt="">
      </swiper-action>
    </view>
    <!-- 点赞 -->
    <view class="rank">
      <view class="dianzai">
        <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
      </view>
      <view class="collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
    <!-- 专辑 -->
    <view class="link" v-if="album.length">
      <view class="connect">相关</view>
      <view class="albumInfoList">
        <view class="albumItem"
          v-for="item in album"
          :key="item.id"
        >
          <view class="albumItemPic">
            <img mode="aspectFill'" :src="item.cover" alt="">
          </view>
          <view class="albumItemInfo">
            <view class="albumbtn">专辑</view>
            <view class="albumName">{{item.name}}</view>
            <text class="iconfont iconiconfontjiantou4"></text>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新评论 -->
    <view class="albumComment" v-if="hot.length">
      <view class="albumCommentTitle">
        <text class="iconfont iconhot1"></text>
        <text class="titlerText">最热评论</text>
      </view>
      <view class="hotList">
        <view class="hotItem"
          v-for="item in hot"
          :key="item.id"
        >
          <view class="hotTop">
            <view class="hotAvatar">
              <image mode="widthFix" :src="item.user.avatar" alt="" />
            </view>
            <view class="hotUserInfo">
              <text class="hotUserName">{{item.user.name}}</text>
              <view class="hotTime">{{item.newtime}}</view>
            </view>
            <view class="userBadge">
              <image
                v-for="item2 in item.user.title"
                :key="item2.icon"
                :src="item2.icon" alt="">
            </view>
          </view>
          <view class="hotBottom">
            <view class="commentText">{{item.content}}</view>
            <view class="commentZan">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热评论 -->
     <view class="albumComment" v-if="comment.length">
      <view class="albumCommentTitle">
        <text class="iconfont iconpinglun"></text>
        <text class="titlerText">最新评论</text>
      </view>
      <view class="hotList">
        <view class="hotItem"
          v-for="item in comment"
          :key="item.id"
        >
          <view class="hotTop">
            <view class="hotAvatar">
              <image mode="widthFix" :src="item.user.avatar" alt="" />
            </view>
            <view class="hotUserInfo">
              <text class="hotUserName">{{item.user.name}}</text>
              <view class="hotTime">{{item.newtime}}</view>
            </view>
            <view class="userBadge">
              <image
                v-for="item2 in item.user.title"
                :key="item2.icon"
                :src="item2.icon" alt="">
            </view>
          </view>
          <view class="hotBottom">
            <view class="commentText">{{item.content}}</view>
            <view class="commentZan">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 下载图片到本地 -->
    <view class="download">
      <view class="downloadBtn" @click="downLoadImg">下载图片</view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import swiperAction from '@/components/swiperAction'
moment.locale('zh-cn')
export default {
  components:{
    swiperAction
  },
  data(){
    return {
      imgDetail:{},
      album:[],
      comment:[],
      hot:[],
      index:-1,
      imgList:[]
    }
  },
  onLoad(){
    const {list,index} = getApp().globalData;
    this.imgIndex = index
    this.imgList = list
    this.getData()
  },
  methods:{
    // 更改数据
    getData(){
    this.imgDetail = this.imgList[this.imgIndex]
    // this.imgDetail.newThumb = this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',360)
    this.imgDetail.newTime = moment(this.imgDetail.atime*1000).fromNow()
    this.getComment(this.imgDetail.id)
    },
    // 获取评论
    getComment(id){
      this.request({
        url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      }).then(res=>{
        // console.log(res.res)
        res.res.comment.forEach(v=>v.newtime=moment(v.atime*1000).fromNow())
        res.res.hot.forEach(v=>v.newtime=moment(v.atime*1000).fromNow())
        // console.log(res.res.hot)
        this.album = res.res.album
        this.hot = res.res.hot
        this.comment = res.res.comment
      })
    },
    // 滑动操作
    handleAction(e){
      // console.log(event)
      if(e.direction==='right'&&this.index>0){
        this.imgIndex--
        this.getData()
      }else if(e.direction==='left'&&this.index<this.imgList.length-1){
        this.imgIndex++
        this.getData()
      }else{
        uni.showToast({
          title:'没有数据了',
          icon:'none'
        })
      }
    },
    // 下载文件
    async downLoadImg(){
      await uni.showLoading({
        title:'下载中'
      })
      const file = await uni.downloadFile({url:this.imgDetail.img})
      const {tempFilePath} = file[1]
      const img = await uni.saveImageToPhotosAlbum({filePath:tempFilePath})
      uni.hideLoading()
      await uni.showToast({
        title:'下载成功'
      })
      // console.log(img)
    }
  }
}
</script>

<style scoped lang='scss'>
.picTop {
  display: flex;
  padding: 20rpx;
  .picAvatar {
    padding: 0 10rpx;
    image {
      width: 88rpx;
      border-radius: 50%;
    }
  }

  .userInfo {
    padding:0 20rpx;
    .picName {
      color: black;
      font-size: 30rpx;
    }
    .picTime {
      padding: 10rpx 0;
      color: #ccc;
      font-size: 24rpx;

    }
  }
}
.rank {
  display: flex;
  height: 80rpx;
  border-bottom: 2rpx solid #ccc;
  .dianzai {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
   
  }

  .collect {
    border-left:2rpx solid #ccc;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
}
.link {
  .connect {
    color: #ccc;
    padding:0 20rpx;
  }

  .albumInfoList {
    border-bottom: 10rpx solid #ccc;
    .albumItem {
      display: flex;
      padding: 20rpx;
      .albumItemPic {
        flex: 1;
        image {
          height: 180rpx;
          width: 180rpx;
        }
      }
      .albumItemInfo {
        flex:2;
        padding-left: 10rpx;
        position: relative;
        .albumbtn {
          height:50rpx;
          width: 100rpx;
          background: $color;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;

        }
        .albumName {
          color: black;
          font-size: 30rpx;
          padding: 20rpx 0;
        }
        .iconfont{
          color: black;
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
        }
      }
    }
  }
  
}
.albumComment{
  .albumCommentTitle{
    padding:15rpx;
    .iconfont{
      font-size: 40rpx;
      color: red;
    }
    .titlerText{
      font-size: 30rpx;
      font-weight: 600;
      color: #666;
      margin-left: 15rpx;
    }
  }
  .hotList {
  .hotItem {
    border-bottom: 15rpx solid #ccc;
    padding: 10rpx 0;
    // display: flex;
    .hotTop {
      // padding: 0 20rpx;
      display: flex;
      .hotAvatar{
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
            width: 90%;
        }
      }
      
      .hotUserInfo {
        flex:1;
        // margin-left: 15rpx;
        .hotUserName {
          color: grey;
          font-size: 24rpx;
        }
        .hotTime {
          color: black;
          font-size:28rpx;
          padding: 5rpx 0;
        }
      }
      .userBadge{
        image{
        width: 40rpx;
        display: inline-block;
        height: 40rpx;
        }
      }
    }
    .hotBottom {
      display: flex;
      padding:30rpx 0;
      .commentText {
        flex: 1;
        padding-left: 15%;
        color: black;
      }

      .commentZan {
        text-align: right;
        .iconfont {

        }
      }
    }
  }
  .albumComment{
    .iconpinglun{
      color: aqua!important;
    }
  }
}
}
.download{
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .downloadBtn{
    background: $color;
    height:85%;
    width: 90%;
    color: white;
    font-size: 40rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

