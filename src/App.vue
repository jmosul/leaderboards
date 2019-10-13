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

<style lang="scss">
    // Import Bulma's core
    @import "~bulma/sass/utilities/_all";

    // Set your colors
    $primary: #8c67ef;
    $primary-invert: findColorInvert($primary);
    $secondary: #4099FF;
    $secondary-invert: findColorInvert($secondary);

    // Setup $colors to use as bulma classes (e.g. 'is-twitter')
    $colors: (
        "white": ($white, $black),
        "black": ($black, $white),
        "light": ($light, $light-invert),
        "dark": ($dark, $dark-invert),
        "primary": ($primary, $primary-invert),
        "info": ($info, $info-invert),
        "success": ($success, $success-invert),
        "warning": ($warning, $warning-invert),
        "danger": ($danger, $danger-invert),
        "secondary": ($secondary, $secondary-invert)
    );

    // Links
    $link: $primary;
    $link-invert: $primary-invert;
    $link-focus-border: $primary;

    // Import Bulma and Buefy styles
    @import "~bulma";
    @import "~buefy/src/scss/buefy";

    html, body {
        height: 100%;
        margin: 0;

        --color-primary: #{$primary};
        --color-primary-accent: #{$primary-invert};
        --color-primary-highlight: #{$primary};
        --color-background: #232f3e;
        --color-secondary: #{$secondary};
        --color-secondary-accent: #{$secondary-invert};
        --color-danger: #{$colors("danger")};
        --color-error: #d0021b;
        --gradient-blaze: linear-gradient(270deg,#{$secondary},#{$primary});
        --button-background-color: #{$primary};
        --button-color: #{$primary-invert};
    }

    main {
        padding-top: 15px;

        p {
            margin: 10px;
        }

        p.panel-heading {
            margin: 0;
        }
    }

    .app {
        box-sizing: border-box;
        position: relative;
        padding-bottom: 180px; /* Height of footer */
        min-height: 100%;
    }
</style>
