<template>
  <view class="wrap" @touchstart="handleStart"
    @touchend="handleEnd"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  data(){
    return {
      starttime:'',
      clientX:'',
      clientY:''
    }
  },
  methods:{
    handleStart(event){
      this.starttime = Date.now()
		  this.startX = event.changedTouches[0].clientX
		  this.startY = event.changedTouches[0].clientY
    },
    handleEnd(event){
      let endtime = Date.now()
		  let endX = event.changedTouches[0].clientX
		  let endY = event.changedTouches[0].clientY
		  if(endtime-this.starttime>2000){
			//判断按下的时长是否合法
			return;
		  }
		  let direction = ''
		  if(Math.abs(endX-this.startX)>10&&Math.abs(endY-this.startY)<10){
			//判断滑动的距离是否合法
			direction = endX-this.startX>0?'right':'left'
		  }else{
			return;//不再向下执行
      }
      this.$emit('swiperAction',{direction})
    }
  }

}
</script>

<style>

</style>