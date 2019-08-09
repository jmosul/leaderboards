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
                        <button type="button" class="button is-primary" v-if="signedIn">
                            TODO: Sign Out
                        </button>
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
    import {Navbar} from 'buefy';
    import Vue from 'vue';
    import Component from 'vue-class-component';

    Vue.use(Navbar);

    @Component({})
    export default class AppHeader extends Vue {
        signedIn = false;

        created() {
            return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
                .then(() => this.signedIn = true)
                .catch(() => this.signedIn = false);
        }
    }
</script>

<style scoped>

</style>
