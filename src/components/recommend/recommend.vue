<template>
    <div class="content-wrapper">
      <slider>
        <div v-for="item in sliderList" class="pic-content">
          <a :href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </div>
      </slider>
    </div>
</template>
<script>
import { getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "base/slider/slider";

export default {
  components: {
    Slider
  },
  data: function() {
    return {
      sliderList: []
    };
  },
  created: function() {
    this._getRecommend();
  },
  methods: {
    _getRecommend: function() {
      getRecommend().then(res => {
        if (res.code == ERR_OK) {
          this.sliderList = res.data.slider;
          console.log(2);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

div {
  color: #fff;
}
</style>

