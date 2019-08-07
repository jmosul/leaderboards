import Amplify, * as AmplifyModules from 'aws-amplify';
import {AmplifyPlugin} from 'aws-amplify-vue';
import Vue from 'vue';
import Vuex from 'vuex';

import config from './aws-exports';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

Amplify.configure(config);

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        leaguePool: window.location.hostname,
    },
    mutations: {},
    actions: {},
    getters: {
        leaguePool: (state) => state.leaguePool,
    },
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
