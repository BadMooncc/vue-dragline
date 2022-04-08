import Vue from 'vue';
import App from './App.vue';
import router from '../router/index';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.component('vue-draggable', VueDraggableResizable);
Vue.use(ElementUI, { size: 'small' });
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
