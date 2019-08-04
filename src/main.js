import Amplify, * as AmplifyModules from 'aws-amplify';
import {AmplifyPlugin} from 'aws-amplify-vue';
import Vue from 'vue';

import config from './aws-exports';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

Amplify.configure(config);

Amplify.Logger.LOG_LEVEL = 'DEBUG';

Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
