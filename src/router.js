import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Identity from './views/Identity.vue';
import NotFound from './views/NotFound.vue';
import League from './views/League.vue';
import store from '@/stores';
import Join from './views/Join';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/identity',
            component: Identity,
            meta: {
                signedOutOnly: true,
            },
        },
        {
            path: '/:leagueId',
            name: 'league',
            component: League,
        },
        {
            path: '/:leagueId/join',
            name: 'join',
            component: Join,
        },
        {
            path: '*',
            component: NotFound,
        },
    ],
});

// sync(store, router);

router.beforeResolve((to, from, next) => {
    if (to.path !== '*') {
        Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
            // update user store
            store.commit('user/username', data.username);
            store.commit('user/id', data.attributes.sub);

            if (store.getters['user/leagueIds'].length === 0) {
                store.dispatch('user/updateLeagues');
            }

            if (to.matched.some(record => record.meta.signedOutOnly)) {
                store.dispatch('league/handleRouteChange', {params: {}});

                next({path: '/'});
            }

            store.dispatch('league/handleRouteChange', to).then(
                () => next()
            );
        }).catch((e) => next({
            path: '/identity',
        }));
    }

    next();
});

export default router;
