<template>
    <header>
        <b-navbar
            type="is-light"
        >
            <template slot="brand">
                <b-navbar-item href="/">
                    <img
                        src="../assets/favicon-32x32.png"
                        alt="Leaderboards"
                    >
                    &nbsp;
<!--                    <h1 class="is-size-4">Title here</h1>-->
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" to="/">
                    Home
                </b-navbar-item>
                <b-navbar-item tag="router-link" to="/protected">
                    Protected
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <router-link to="/identify" class="button is-primary">
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

    @Component({
    })
    export default class AppHeader {

    }
</script>

<style scoped>

</style>
