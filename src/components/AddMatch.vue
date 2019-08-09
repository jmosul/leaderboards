<template>
    <form name="addMatch" @submit.prevent="handleAdd">
        <b-field groupped>
            <b-select placeholder="Player 1">
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </b-select>

            <span>
                v
            </span>

            <b-select placeholder="Player 1">
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </b-select>
        </b-field>
    </form>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Field, Select} from 'buefy/src/index';

    Vue.use(Field);
    Vue.use(Select);

    @Component({
        components: { Field, Select},
    })
    export default class AddMatch extends Vue {

    }
</script>

<style scoped>

</style>
