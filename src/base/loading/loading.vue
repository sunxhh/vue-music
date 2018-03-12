<template>
  <div class="loading">
      <img src="../../common/img/loading.gif">
      <p>{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在加载..."
    }
  }
};
</script>
<style lang="stylus" scoped>
$height = 30px;

.loading {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;

    img {
        width: $height;
        height: $height;
    }

    p {
        margin-left: 10px;
        color: #fff;
        font-size: 14px;
        line-height: $height;
    }
}
</style>
