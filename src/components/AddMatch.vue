<template>
    <form name="addMatch" @submit.prevent="handleAdd">
        <b-field groupped>
            <b-select placeholder="Player 1">
                <option
                    v-for="(competitor, key) in competitors"
                    :value="competitor.competitorId"
                    :key="competitor.competitorId"
                >
                    {{ competitor.name }}
                </option>
            </b-select>

            <span>
                v
            </span>

            <b-select placeholder="Player 2">
                <option
                    v-for="(competitor, key) in competitors"
                    :value="competitor.competitorId"
                    :key="competitor.competitorId"
                >
                    {{ competitor.name }}
                </option>
            </b-select>
        </b-field>
    </form>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Getter} from 'vuex-class';

    @Component({})
    export default class AddMatch extends Vue {
        @Getter('league/competitors') competitors;
    }
</script>

<style scoped>

</style>
