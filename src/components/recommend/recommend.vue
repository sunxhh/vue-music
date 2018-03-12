<template>
    <div class="content-wrapper">
      <slider v-if="sliderList.length>0" v-bind:slider-number="sliderList.length">
        <div v-for="item in sliderList" class="pic-content">
          <a :href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </div>
      </slider>
      <div class="recommend-list-wrapper">
        <h1>热门歌单推荐</h1>
        <div class="recommend-list">
          <div class="recommend" v-for="item in recommendList">
            <img v-lazy="item.cover">
            <div class="recommend-content">
              <h3>{{item.username}}</h3>
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
        <div class="loading-wapper" v-if="isLoading">
          <loading></loading>
        </div>
      </div>
    </div>
</template>
<script>
import { getRecommend, getRecommendList } from "api/qqApi/recommend";

import Slider from "base/slider/slider";
import Loading from "base/loading/loading";

export default {
  components: {
    Slider,
    Loading
  },
  data: function() {
    return {
      sliderList: [],
      recommendList: [],
      isLoading: false
    };
  },
  created: function() {
    this._getRecommend();
    this._getRecommendList();
  },
  methods: {
    _getRecommend: function() {
      getRecommend().then(res => {
        this.sliderList = res.data.slider;
      });
    },
    _getRecommendList: function() {
      this.isLoading = true;
      getRecommendList().then(res => {
        this.recommendList = res.recomPlaylist.data.v_hot;
        this.isLoading = false;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.content-wrapper {
  color: #fff;

  .recommend-list-wrapper {
    h1 {
      color: $color-theme;
      font-size: $font-size-medium-x;
      text-align: center;
      height: 35px;
      line-height: 35px;
    }

    .recommend-list {
      .recommend {
        display: flex;
        align-content: center;
        justify-content: center;
        margin: 0px 12px 20px 12px;

        img {
          width: 65px;
          height: 65px;
          flex-grow: 0;
        }

        .recommend-content {
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: center;
          flex-grow: 1;
          margin: 0px 10px;

          h3 {
            color: $color-text;
            font-size: $font-size-medium;
            margin-bottom: 5px;
          }

          p {
            line-height: 25px;
            color: $color-text-l;
            font-size: $font-size-small;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>

