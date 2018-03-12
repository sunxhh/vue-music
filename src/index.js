import Vue from "vue";
import App from "./app";

import 'src/common/stylus/index.styl';
import fastclick from "fastclick";
import VueLazyload from 'vue-lazyload';

import router from "./router";

// 图片懒加载
Vue.use(VueLazyload, {
    preLoad: 1.1,
    error: 'dist/error.png',
    loading: require('common/img/default-img.png'),
    attempt: 1
});

fastclick.attach(document.body);

new Vue({
    el: '#app',
    render: (h) => {
        return h(App);
    },
    router
});
