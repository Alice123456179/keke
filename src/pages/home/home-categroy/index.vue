<template>
  <view>
    <view class="categroy">
      <navigator class="categroyItem"
        v-for="item in category"
        :key="item.id"
        :url="`/pages/imgCategroy/index?id=${item.id}`"
      >
        <image mode="aspectFill" :src="item.cover" alt="">
        <view class="itemText">
          {{item.name}}
        </view>
      </navigator>
    </view>
  </view>
</template>
<script>
export default {
  data(){
    return {
      category:[]
    }
  },
  mounted(){
    this.initData()
    uni.setNavigationBarTitle({title:'分类'})
  },
  methods:{
    initData(){
      this.request({
        url:'http://157.122.54.189:9088/image/v1/vertical/category'
      }).then(res=>{
        console.log(res.res)
        this.category = res.res.category
      })
    }
  }
}
</script>
<style scoped lang='scss'>
.categroy {
  display: flex;
  flex-wrap: wrap;
  .categroyItem {
    width: 33.33%;
    border: 4rpx solid white;
    position: relative;
    image{
      height: 240rpx;
    }
    }
    .itemText {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 0 10rpx 20rpx;
      color: white;
      font-size: 36rpx;
      display: flex;
      align-items: center;
      // justify-content: center;
      background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
    }
}

</style>