<template>
    <header>
        <b-navbar
            type="is-dark"
        >
            <template slot="brand">
                <b-navbar-item href="/">
                    <img
                        src="../assets/favicon-32x32.png"
                        alt="Leaderboards"
                    >
                    &nbsp;
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" to="/">
                    Leagues
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <sign-out v-if="signedIn"></sign-out>
                        <router-link to="/identify" class="button is-primary" v-else>
                            Sign In/Up
                        </router-link>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </header>
</template>

<script>
    import {AmplifyEventBus} from 'aws-amplify-vue';
    import Component from 'vue-class-component';
    import {Navbar} from 'buefy/src/index';
    import SignOut from './Auth/SignOut';
    import Vue from 'vue';

    Vue.use(Navbar);

    @Component({
        components: {
            SignOut,
        },
    })
    export default class AppHeader extends Vue {
        signedIn = false;

        created() {
            AmplifyEventBus.$on('authState', info => this.confirmSignedIn());

            return this.confirmSignedIn();
        }

        confirmSignedIn() {
            return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
                .then(() => this.signedIn = true)
                .catch(() => this.signedIn = false);
        }
    }
</script>

<style scoped>

</style>
