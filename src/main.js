import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

import HomePage from './components/HomePage'
import Category from './components/Category'

import './registerServiceWorker'

const router = new VueRouter({
    mode: 'history',
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
