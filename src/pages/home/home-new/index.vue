<template>
  <view>album</view>
</template>
<script>
export default {
  mounted(){
    this.initData()
    uni.setNavigationBarTitle({title:'最新'})
  },
}
</script>