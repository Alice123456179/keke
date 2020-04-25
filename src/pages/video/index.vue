<template>
  <view>
     <view class="tabTitle">
        <view class="inner">
        <uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text" active-color="#d4237a"></uni-segmented-control>
        </view>
        <view class="iconfont iconsearch"></view>
      </view>
      <view class="content">
          <view v-if="current < 4">
              <video-one :dataObj='{url:items[current].url,dataForm:items[current].dataForm}'></video-one>
          </view>
          <view v-if='current===4'>
              <video-two :dataObj='{url:items[current].url,dataForm:items[current].dataForm}'></video-two>
          </view>
      </view>
  </view>
</template>
<script>
import {uniSegmentedControl}  from "@dcloudio/uni-ui"
import videoOne from './videoOne/index'
import videoTwo from './videoTwo/index'
export default {
  components:{
    uniSegmentedControl,
    videoOne,
    videoTwo
  },
  data() {
			return {
				items: [
          {
            title:'推荐',
            dataForm:{
              limit:30,
              skip:0,
              order:'hot'},
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/featured'
            },
          {
            title:'娱乐',
            dataForm:{
              limit:30,
              skip:0,
              order:'new'
            },
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a'
          },
          {
            title:'最新',
            dataForm:{
              limit:30,
              skip:0,
              order:'new'},
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp'
          },
          {
            title:'热门',
            dataForm:{
              limit:30,
              skip:0,
              order:'hot'},
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp'
          },
          {
            title:'分类',
            dataForm:{},
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/category'
          }],
        current: 0,
        dataForm:{
          limit:30,
          skip:0,
          order:'hot'
        }
			}
    },
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
    }
}
</script>
<style lang='scss' scoped>
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
</style>