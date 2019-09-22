<template>
  <div class="identity">
    <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
  </div>
</template>

<script>
    import Component from 'vue-class-component';
    import signUpConfig from '../config/signUpConfig';
    import AuthComponent from '../components/Auth/AuthComponent';

    @Component({})
    export default class SignIn extends AuthComponent {
        constructor() {
            super();

            this.authConfig = {
                signUpConfig,
            };
        }

        handleConfirmSignUp() {
            this.$router.go('/');
        }

        handleSignedIn() {
            this.$router.go('/');
        }
    }
</script>
