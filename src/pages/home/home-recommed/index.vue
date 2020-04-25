<template>
  <scroll-view @scrolltolower = "handle" scroll-y class="recommedView" v-if="recommedTop.length>0">
    <!-- 头部 -->
    <view class="top">
      <navigator class="topData" 
        v-for="item in recommedTop"
        :key="item.id"
        :url="`/pages/album/index?id=${item.target}`"
      >
        <img mode="widthFix" :src="item.thumb" alt="">
      </navigator>
    </view>
    <!-- 月份 -->
    <view class="monthWrap">
      <view class="monthTitle">
        <view class="monthText">
          <view class="monthTextLeft">
            <text>{{month.DD}}/</text>
            {{month.MM}} 月
          </view>
          <view class="monthTextRight">{{month.title}}</view>
        </view>
        <view class="monthMore">更多></view>
      </view>
      <view class="monthContent">
        <view class="monthItem"
          v-for="(item,index) in month.items"
          :key="item.id"
        >
        <go-detail :list ='month.items' :index='index'>
          <img mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>',360)" alt="">
        </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门 -->
    <view class="hotsWrap">
      <view class="hotsTitle">
        <text>热门</text>
      </view>
      <view class="hotsContent">
        <view class="hotsItem"
          v-for="(item,index) in hots"
          :key="item.id"
        >
         <go-detail :list ='hots' :index='index'>
          <img mode="widthFix" :src="item.thumb" alt="">
         </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>
<script>
import moment from 'moment'
import goDetail from '@/components/goPicDetail'
export default {
  components:{
    goDetail
  },
  data(){
    return{
      recommedTop:[],
      month:{},
      hots:[],
      dataForm:{
        limit:30,
        order:'hot',
        skip:0
      },
      hasMore:true
    }
  },
  mounted(){
    this.initData()
    uni.setNavigationBarTitle({title:'推荐'})
  },
  methods:{
    initData(){
      this.request({
        url:'http://157.122.54.189:9088/image/v3/homepage/vertical',
        data:this.dataForm
      }).then(res=>{
        // console.log(res.res)
        if(this.recommedTop.length===0){
          this.recommedTop = res.res.homepage[1].items
          this.month = res.res.homepage[2]
          this.month.MM = moment(this.month.stime).format('MM')
          this.month.DD = moment(this.month.stime).format('DD')
        }
        if(res.res.vertical.length === 0){
          this.hasMore = false
        }
        this.hots = [...this.hots,...res.res.vertical]
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
.recommedView{
  height:calc( 100vh - 36px )
}
.top{
  display: flex;
  flex-wrap: wrap;
  .topData{
    width: 50%;
    border: 6rpx solid white;
  }
}
.monthWrap {
  .monthTitle {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .monthText {
      font-size: 34rpx;
      font-weight: 600;
      display: flex;
      align-content: center;
      .monthTextLeft {
        color: $color;
        text{
          font-size: 36rpx;
        }
      }
      .monthTextRight {
        color:grey;

      }
    }

    .monthMore {
        color: $color;
        font-size:30rpx;
    }
  }
  .monthContent{
    display: flex;
    flex-wrap:wrap;
    .monthItem{
      width: 33.33%;
      border:6rpx solid white;
    }
  }
}
.hotsWrap {
  .hotsTitle {
    padding: 20rpx;
    text {
      border-left: 8rpx solid $color;
      padding-left:20rpx;
      font-size: 30rpx;
      color:grey;
      font-weight:600;
    }
  }

  .hotsContent {
    display: flex;
    flex-wrap:wrap;
    .hotsItem {
      width: 33.33%;
      border: 6rpx solid white;
    }
  }
}
</style>