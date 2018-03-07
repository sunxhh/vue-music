<template>
  <div class="slider-wrapper">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dot-group">

      </div>
  </div>
</template>
<script>
import { getElementClientSize, addClass, removeClass } from "common/js/dom";
export default {
  data: function() {
    return {};
  },
  created: function() {},
  updated: function() {
    this._setSliderWidth();
  },
  methods: {
    _setSliderWidth: function() {
      let dom = this.$refs.sliderGroup;
      let width = getElementClientSize(dom).width;
      let childs = dom.childNodes;
      let wrapperWidth = width*childs.length;
      dom.style.width = wrapperWidth + "px";
      childs.forEach(child => {
        child.style.width = width + "px";
        addClass(child, "slider-item");
      });
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

  .slider-group {
    position: relative;
    width: 100%;
    overflow: hidden;

    .slider-item {
      display: inline-block;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
