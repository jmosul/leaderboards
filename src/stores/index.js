import Vue from 'vue';
import Vuex from 'vuex';
import league from './league';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {
        league,
        user,
    },
});
