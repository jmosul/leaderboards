import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const namespaced = true;

console.log( 'u', state );

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};
