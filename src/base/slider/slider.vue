<template>
  <div class="slider-wrapper">
      <div class="slider-group" ref="sliderGroup" v-on:touchstart="_touchstart" v-on:touchmove="_touchmove" v-on:touchend="_touchend" v-on:touchcancel="_touchcancel">
        <slot></slot>
      </div>
      <div class="dot-group">

      </div>
  </div>
</template>
<script>
import { getElementClientSize, addClass, removeClass } from "common/js/dom";
function getTouchPos(e) {
  let touch = e.touches[0];
  return {
    x: touch.clientX,
    y: touch.clientY
  };
}

export default {
  data: function() {
    return {};
  },
  created: function() {},
  updated: function() {
    this._setSliderWidth();
    this.allReset();
  },
  methods: {
    touchStartPos: {},
    // 存放计算移动的速度数据
    touchMovePoint: [],
    shifting: {
      start: 0,
      cur: 0
    },
    _touchstart: function(event) {
      this.touchStartPos = getTouchPos(event);
      this.canInertiaMove = false;
    },
    _touchmove: function(event) {
      let touchStartPos = this.touchStartPos;
      if (touchStartPos.x === undefined) {
        return;
      }
      this.canInertiaMove = true;
      let curPos = getTouchPos(event);
      curPos.timeStamp = event.timeStamp;
      let shifting = curPos.x - touchStartPos.x;
      this.setTouchMovePoint(curPos);
      this.moveSliderGroup(shifting);
    },
    _touchend: function(event) {
      this.touchMoveend();
    },
    _touchcancel: function() {
      this.touchMoveend();
    },
    // 获取移动速度
    getMoveSpeed: function() {
      let touchMovePoint = this.touchMovePoint;
      let computeByPointNumber = 3;
      if (touchMovePoint.length < computeByPointNumber) {
        return 0;
      }
      let length = touchMovePoint.length;
      let newList = touchMovePoint.slice(length - computeByPointNumber, length);
      let start = newList[0];
      let end = newList.pop();
      let len = end.x - start.x;
      let time = end.timeStamp - start.timeStamp;
      return len / time;
    },
    setTouchMovePoint: function(pos) {
      this.touchMovePoint.push(pos);
    },
    allReset: function() {
      this.touchStartPos = {};
      this.touchMovePoint = [];
      this.shifting = {
        start: 0,
        cur: 0
      };
    },
    canInertiaMove: true,
    inertiaMove: function() {
      let speed = this.getMoveSpeed();
      let resistance = 0.1;
      let self = this;
      return new Promise((resolve, reject) => {
        if (Math.abs(speed) < 1) {
          resolve();
          return;
        }
        let isPositiveNumber = speed > 0 ? true : false;
        let len = 0;
        function move() {
          if (isPositiveNumber) {
            if (speed > 0 && self.canInertiaMove) {
              speed = speed - resistance;
              len = len + speed;
              self.moveSliderGroup(len);
              window.requestAnimationFrame(move);
            } else {
              resolve();
            }
          } else {
            if (speed < 0 && self.canInertiaMove) {
              speed = speed + resistance;
              len = len + speed;
              self.moveSliderGroup(len);
              self.inertiaMoveing = window.requestAnimationFrame(move);
            } else {
              resolve();
            }
          }
        }
        move();
      });
    },
    // 固定最后的定位点
    fixedPos: function() {
      let curShifting = this.shifting.start;
      let clientWidth = this.clientWidth;
      let number = Math.floor(Math.abs(curShifting) / clientWidth);
      let dif = Math.abs(curShifting) - clientWidth * number;
      let millisecond = 300;
      let countOnceSecond = 60;
      let count = countOnceSecond * millisecond / 1000;
      let self = this;
      if (dif / clientWidth > 0.5) {
        number = number + 1;
        dif = dif - clientWidth;
      }
      let onceDif = dif / count;
      return new Promise((resolve, reject) => {
        let curCount = 0;
        function move() {
          if (curCount <= count) {
            let len = onceDif * curCount;
            self.moveSliderGroup(len);
            curCount++;
            self.inertiaMoveing = window.requestAnimationFrame(move);
          } else {
            resolve();
          }
        }
        move();
      });
    },
    touchMoveend: function() {
      this.shifting.start = this.shifting.cur;
      this.inertiaMove().then(() => {
        this.shifting.start = this.shifting.cur;
        this.fixedPos().then(() => {
          this.shifting.start = this.shifting.cur;
          this.touchStartPos = {};
          this.touchMovePoint = [];
        });
      });
    },
    // 移动外层元素
    moveSliderGroup: function(shifting) {
      this.touchStartPos.shifting = shifting;
      let sliderGroup = this.$refs.sliderGroup;
      let curShifting = this.shifting.start + shifting;
      let clientWidth = this.clientWidth;
      let wrapperWidth = this.wrapperWidth;
      if (curShifting > 0) {
        curShifting = 0;
      } else if (curShifting + wrapperWidth < clientWidth) {
        curShifting = clientWidth - wrapperWidth;
      }
      sliderGroup.style.transform = `translateX(${curShifting}px)`;
      this.shifting.cur = curShifting;
    },
    clientWidth: 0,
    wrapperWidth: 0,
    // 初始化外层元素的宽度以及内部元素的宽度
    _setSliderWidth: function() {
      let dom = this.$refs.sliderGroup;
      let width = getElementClientSize(dom).width;
      this.clientWidth = width;
      let childs = dom.childNodes;
      let wrapperWidth = width * childs.length;
      dom.style.width = wrapperWidth + "px";
      this.wrapperWidth = wrapperWidth;
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
