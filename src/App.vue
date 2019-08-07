// src/components/App.vue
<template>
    <div class="app">
        <app-header></app-header>
        <main class="container">
            <router-view></router-view>
        </main>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {AmplifyEventBus} from 'aws-amplify-vue';
    import {Auth} from 'aws-amplify';
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AppHeader from './components/AppHeader';
    import AppFooter from './components/AppFooter';

    @Component({
        components: {
            AppFooter,
            AppHeader,
        },
    })
    export default class App extends Vue {
        beforeCreate() {
            AmplifyEventBus.$on('authState', info => {
                if (info === 'signedIn') {
                    this.signedIn = true;
                }

                if (info === 'signedOut') {
                    this.$router.push('/auth');
                    this.signedIn = false;
                }
            });

            Auth.currentAuthenticatedUser()
                .then(user => this.signedIn = true)
                .catch(() => this.signedIn = false);
        }
    }
</script>

<style scoped>
    main {
        padding-top: 15px;
    }
</style>
