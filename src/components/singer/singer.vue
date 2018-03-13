<template>
    <div class="content-wrapper">
        
    </div>
</template>
<script>
import { getSingerList } from "api/qqApi/singer";
import SingerClass from "common/js/class/singer";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  created: function() {
    this._getSingerList();
  },
  methods: {
    _getSingerList: function() {
      getSingerList().then(res => {
        this._handleSingerList(res.data.list);
      });
    },
    _handleSingerList: function(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };

      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new SingerClass(item.Fsinger_mid, item.Fsinger_name)
          );
        }
        if (!map[item.Findex]) {
          map[item.Findex] = {
            title: item.Findex,
            items: []
          };
        }
        map[item.Findex].items.push(
          new SingerClass(item.Fsinger_mid, item.Fsinger_name)
        );
      });
      let hot = [map.hot];

      let orderList = [];
      Object.keys(map).forEach(key => {
        if (map[key].title.match(/[a-zA-Z]/)) {
          orderList.push(map[key]);
        }
      });
      orderList.sort(function(a, b) {
        if (a.title.charCodeAt(0) > b.title.charCodeAt(0)) {
          return 1;
        }
        return -1;
      });
      console.log(orderList);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';
</style>

