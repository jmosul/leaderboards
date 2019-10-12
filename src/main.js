import Amplify, * as AmplifyModules from 'aws-amplify';
import {AmplifyPlugin} from 'aws-amplify-vue';
import Vue from 'vue';
import Vuex from 'vuex';
import config from './aws-exports';
import App from './App.vue';
import router from './router';
import store from '@/stores';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false;

Amplify.configure(config);

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(Vuex);

Vue.use(Buefy, {
    defaultIconPack: 'fas',
});

Vue.use(VeeValidate, {
    events: '',
});

Vue.use(VueClipboard);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
