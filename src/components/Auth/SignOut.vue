<template>
    <amplify-sign-out
        v-bind:signOutConfig="config"
    ></amplify-sign-out>
</template>

<script>
    import Component from 'vue-class-component';
    import AuthComponent from './AuthComponent';

    @Component({})
    export default class SignOut extends AuthComponent {
        config = {};

        handleSignedOut() {
            this.$router.go('/identity');
        }
    }
</script>

<style scoped>

</style>
