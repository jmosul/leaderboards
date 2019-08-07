<template>
  <div class="identity">
    <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
  </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import signUpConfig from '../config/signUpConfig';
    import {AmplifyEventBus} from 'aws-amplify-vue';

    @Component({})
    export default class SignIn extends Vue {
        constructor() {
            super();

            this.authConfig = {
                signUpConfig,
            };

            this._registerListeners();
        }

        handleConfirmSignUp() {
            this.$router.go('/');
        }

        _registerListeners() {
            AmplifyEventBus.$on('authState', info => {
                const event = info.charAt(0).toUpperCase() + info.slice(1);

                const handler = `handle${event}`;

                if (this[handler]) {
                    this[handler]();
                }
            });
        }
    }
</script>
