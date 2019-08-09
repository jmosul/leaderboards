<template>
    <section>
        <add-match></add-match>
    </section>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AddMatch from '../components/AddMatch';

    @Component({
        components: { AddMatch },
    })
    export default class League extends Vue {

    }
</script>

<style scoped>

</style>
