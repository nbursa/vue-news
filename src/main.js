import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {VueMasonryPlugin} from 'vue-masonry'
import axios from 'axios'

Vue.prototype.$axios = axios

Vue.use(VueRouter)
Vue.use(VueMasonryPlugin)
Vue.config.productionTip = false

import HomePage from './components/HomePage'
import Category from './components/Category'

import './registerServiceWorker'

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', component: HomePage, props: true },
        { path: '/category', component: Category, props: true }
    ]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app')
