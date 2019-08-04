<template>
    <div>
        <amplify-sign-up v-bind:signUpConfig="signUpConfig"></amplify-sign-up>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({
        props: {
            propMessage: String
        }
    })

    export default class SignUp extends Vue {

        constructor() {
            super();

            this.signUpConfig = {
                hideAllDefaults: true,
                    signUpFields: [
                    {
                        label: 'Username',
                        key: 'username',
                        required: true,
                        displayOrder: 1,
                        type: 'string',
                    },
                    {
                        label: 'Email',
                        key: 'email',
                        required: true,
                        displayOrder: 2,
                        type: 'string',
                        signUpWith: true
                    },
                    {
                        label: 'Password',
                        key: 'password',
                        required: true,
                        displayOrder: 3,
                        type: 'password'
                    },
                ]
            }
        }
    }
</script>

<style>
</style>
