import Amplify, * as AmplifyModules from 'aws-amplify';
import {AmplifyPlugin} from 'aws-amplify-vue';
import Vue from 'vue';
import Vuex from 'vuex';
import 'buefy/src/scss/buefy-build.scss';
import config from './aws-exports';

Vue.config.productionTip = false;

Amplify.configure(config);

import App from './App.vue';
import router from './router';
import store from '@/stores';

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(Vuex);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
