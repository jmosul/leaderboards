import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Identity from './views/Identity.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/identity',
            component: Identity,
            meta: {
                signedOutOnly: true
            }
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});

router.beforeResolve((to, from, next) => {
    if(to.path !== '*') {
        Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
            if (to.matched.some(record => record.meta.signedOutOnly)) {
                next({path: '/'})
            }

            next();
        }).catch((e) => next({
            path: '/identity'
        }));
    }

    next();
});

export default router;
