<template>
    <div class="content-wrapper">
    推荐
    </div>
</template>
<script>
import { getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
export default {
  created: function() {
    this._getRecommend();
  },
  methods: {
    _getRecommend: function() {
      getRecommend().then(res => {
        if (res.code == ERR_OK) {
          console.log(res.data.slider);
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

