import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import home from '@/examples/home.vue';
// console.log(drag)
export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'drag',
            component: home
        }
    ]
});