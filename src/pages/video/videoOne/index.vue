<template>
  <scroll-view scroll-y 
    enable-flex
    @scrolltolower="handle"
  class="one" >
      <view class="listItem"
        v-for="item in list"
        :key="item.id"
        @click="goVideo(item)"
      >
        <image mode="widthFix" :src="item.img" alt="" />
      </view>
  </scroll-view>
  
</template>

<script>
export default {
  props:{
    dataObj:Object
  },
  watch:{
    dataObj(){
      // console.log(this.dataObj)
      this.list = []
      this.hasMore = true
      this.initData()
    }
  },
  data(){
    return {
      list:[],
      hasMore:true
    }
  },
  mounted(){
    // console.log(this.dataObj)
    this.initData()
  },
  methods:{
    // 跳转
    goVideo(item){
      getApp().globalData.video = item
      uni.navigateTo({
        url:'/pages/videoPlay/index'
      })
    },
    // 初始化数据
    initData(){
      this.request({
        url:this.dataObj.url,
        data:this.dataObj.dataForm
      }).then(res=>{
        // console.log(res)
        if(res.res.videowp.length===0){
          this.hasMore = false
          return;
        }
        this.list =[...this.list,...res.res.videowp]
        // console.log(this.list)
      })
    },
  // 分页
  handle(){
      if(this.hasMore){
        this.dataObj.dataForm.skip += this.dataObj.dataForm.limit
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
.one{
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);
  .listItem{
    width: 33.33%;
    border: 4rpx solid white;
  }
}
</style>