<template>
    <b-message
        title="Not Found"
        size="is-large"
        type="is-danger"
        has-icon
        :closable="closeable"
    >
        <p>The page you are looking for does not exist.</p>
        <router-link to="/">Return home</router-link>
    </b-message>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Message} from 'buefy';

    Vue.use(Message);

    @Component()
    export default class NotFound extends Vue {
        closeable = false;
    }
</script>

<style scoped>

</style>
