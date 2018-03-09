<template>
    <div class="content-wrapper">
      <slider v-if="sliderList.length>0" v-bind:slider-number="sliderList.length">
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

import Slider from "base/slider/slider";

let axios = require("axios");

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
    this._getRecommendList();
  },
  methods: {
    _getRecommend: function() {
      getRecommend().then(res => {
        this.sliderList = res.data.slider;
      });
    },
    _getRecommendList: function() {
      let sendData = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: "utf8",
        outCharset: "utf - 8",
        notice: 0,
        platform: "yqq",
        needNewCode: 0,
        data:
          '{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
      };
      axios({
        method: "get",
        url: "/api/musicu",
        params: sendData
      })
        .then(response => {
          res.send(response);
        })
        .catch(response => {
          res.send(response);
        });
    },
    change: function(num) {
      console.log(num);
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

