import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignIn from './views/SignIn.vue';
import Protected from './views/Protected.vue';

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
            path: '/auth',
            component: SignIn
        },
        {
            path: '/protected',
            component: Protected,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeResolve((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // let user;
        Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
            // if (data && data.signInUserSession) {
            //     user = data;
            // }

            next();
        }).catch((e) => next({
            path: '/sign-in'
        }));
    }

    next();
});

export default router;
