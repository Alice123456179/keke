<template>
  <view class="goDetail" @click="goDetail">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props:{
    list:Array,
    index:Number
  },
  methods:{
    goDetail(){
      getApp().globalData.list = this.list
      getApp().globalData.index = this.index
      uni.navigateTo({
        url:'/pages/pic/index'
      })
    }
  }

}
</script>

<style>

</style>