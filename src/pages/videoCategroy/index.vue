<template>
  <view class="imgWrap">
    <view>
      <view class="tabTitle">
          <view class="inner">
          <uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text" active-color="#d4237a"></uni-segmented-control>
          </view>
          <view class="iconfont iconsearch"></view>
        </view>
        <view class="content">
            <view v-if="current === 0">
              <scroll-view enable-flex @scrolltolower = "handle" scroll-y class="new">
                <view class="newItem"
                  v-for="item in List"
                  :key="item.id"
                  @click="goVideo(item)"
                >
                  <image mode="widthFix" :src="item.img" alt="">
                </view>
              </scroll-view>
            </view>
            <view v-if="current === 1">
                <scroll-view enable-flex @scrolltolower = "handle" scroll-y class="new">
                <view class="newItem"
                  v-for="item in List"
                  :key="item.id"
                  @click="goVideo(item)"
                >
                  <image mode="widthFix" :src="item.img" alt="">
                </view>
              </scroll-view>
            </view>
        </view>
      </view>
    </view>
</template>

<script>
import {uniSegmentedControl}  from "@dcloudio/uni-ui"
export default {
  components:{
      uniSegmentedControl,
  },
  data(){
    return{
      items:[
        {title:'最新',order:'new'},
        {title:'热门',order:'hot'}
      ],
      current:0,
      id:undefined,
      List:[],
      dataForm:{
        limit:30,
        skip:0,
        order:'new'
      },
      hasMore:true
    }
  },
  onLoad(e){
    console.log(e)
    this.id = e.id
    this.initData()

  },
  methods:{
    // 初始化数据
     initData(){
      this.request({
        url:`http://157.122.54.189:9088/videoimg/v1/videowp/category/${this.id}`,
        data:this.dataForm
      }).then(res=>{
        console.log(res.res)
        if(res.res.videowp.length===0){
          this.hasMore = false
          return;
        }
        this.List= [...this.List,...res.res.videowp]
      })
    },
     // 跳转
    goVideo(item){
      getApp().globalData.video = item
      uni.navigateTo({
        url:'/pages/videoPlay/index'
      })
    },
    // 点击切换选项卡
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
          this.current = e.currentIndex;
          this.dataForm.skip = 0
          this.List = []
      }else{
        return;
      }
      this.dataForm.order = this.items[e.currentIndex].order
      this.initData()
    },
    // 分页
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
.tabTitle{
  position: relative;
  .inner{
    width:60%;
    margin:0 auto;
  }
  .iconfont{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right:5%;
    vertical-align: middle;
  }
}
.new{
  display: flex;
  flex-wrap: wrap;
  height:calc(100vh - 36px);
  .newItem{
    width: 33.33%;
    border: 4rpx solid white;
  }
}
</style>