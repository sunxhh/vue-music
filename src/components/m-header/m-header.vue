<template>
    <div class="header-wrapper">
        <div class="icon"></div>
        <h1 class="text">音乐</h1>
    </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

$header-wrapper-height = 44px;

.header-wrapper {
    text-align: center;
    height: $header-wrapper-height;
    line-height: $header-wrapper-height;

    .icon {
        height: $header-wrapper-height;
        width: $header-wrapper-height;
        bg-image('./logo');
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        vertical-align: top;
        margin-right: 10px;
    }

    .text {
        vertical-align: top;
        display: inline-block;
        font-size: $font-size-large-x;
        height: $header-wrapper-height;
        line-height: $header-wrapper-height;
        color: $color-theme-d;
    }
}
</style>

