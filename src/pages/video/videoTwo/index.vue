<template>
  <scroll-view scroll-y 
    enable-flex
    @scrolltolower="handle"
  class="one" >
      <navigator class="listItem"
        v-for="item in list"
        :key="item.id"
        :url="`/pages/videoCategroy/index?id=${item.id}`"
       
      >
        <image mode="aspectFill" :src="item.img" alt="" />
      </navigator>
  </scroll-view>
  
</template>

<script>
export default {
  props:{
    dataObj:Object
  },
  // watch:{
  //   dataObj(){
  //     // console.log(this.dataObj)
  //     this.list = []
  //     this.hasMore = true
  //     this.initData()
  //   }
  // },
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
    initData(){
      this.request({
        url:this.dataObj.url,
      }).then(res=>{
        // console.log(res)
        if(res.res.category.length===0){
          this.hasMore = false
          return;
        }
        this.list =[...this.list,...res.res.category]
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
    // height: 210rpx;
    image{
      height: 200rpx;
      width: 260rpx;
    }
  }
}
</style>