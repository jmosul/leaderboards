<template>
  <div class="about">
    <h1>This is SIGN IN</h1>

    <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
  </div>
</template>

<script>
    import Component from 'vue-class-component';
    import AuthView from './AuthView';
    import signUpConfig from '../config/signUpConfig';

    @Component({})

    export default class SignIn extends AuthView {
        constructor() {
            super();

            this.authConfig = {
                signUpConfig
            };
        }

        handleConfirmSignUp() {

        }
    }
</script>
