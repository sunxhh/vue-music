import Vue from "vue";
import App from "./app";

import 'src/common/stylus/index.styl';
import fastclick from "fastclick";

import router from "./router";

fastclick.attach(document.body);

new Vue({
    el: '#app',
    render: (h) => {
        return h(App);
    },
    router
});