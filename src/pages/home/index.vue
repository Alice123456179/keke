<template>
	<view class="content">
	  <view>
      <view class="tabTitle">
        <view class="inner">
        <uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text" active-color="#d4237a"></uni-segmented-control>
        </view>
        <view class="iconfont iconsearch"></view>
      </view>
      <view class="content">
          <view v-if="current === 0">
              <home-recommed></home-recommed>
          </view>
          <view v-if="current === 1">
              <home-categroy></home-categroy>
          </view>
          <view v-if="current === 2">
              <home-new></home-new>
          </view>
          <view v-if="current === 3">
              <home-album></home-album>
          </view>
      </view>
    </view>
	</view>
</template>

<script>
import {uniSegmentedControl}  from "@dcloudio/uni-ui"
import homeRecommed  from "./home-recommed/index"
import homenew  from "./home-new/index"
import homeCategroy  from "./home-categroy/index"
import homeAlbum  from "./home-album/index"

	export default {
    components:{
      uniSegmentedControl,
      homenew,
      homeRecommed,
      homeCategroy,
      homeAlbum
    },
		data() {
			return {
				items: [
          {title:'推荐'},
          {title:'分类'},
          {title:'最新'},
          {title:'专辑'}],
        current: 1
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
