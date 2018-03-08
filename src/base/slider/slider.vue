<template>
  <div class="slider-wrapper">
      <div class="slider-group" ref="sliderGroup">
        <scroll v-bind:slider-width="clientWidth">
          <slot></slot>
        </scroll>
      </div>
      <div class="dot-group">

      </div>
  </div>
</template>
<script>
import { getElementClientSize, addClass, removeClass } from "common/js/dom";
import Scroll from "base/scroll/scroll";
export default {
  data: function() {
    return {
      clientWidth: 0
    };
  },
  components: { Scroll },
  created: function() {},
  updated: function() {
    this._setSliderWidth();
  },
  methods: {
    // 初始化外层元素的宽度以及内部元素的宽度
    _setSliderWidth: function() {
      let sliderGroup = this.$refs.sliderGroup;
      let width = getElementClientSize(sliderGroup).width;
      this.clientWidth = width;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.slider-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
