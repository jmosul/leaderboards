<template>
    <div class="panel">
        <b-table
            :columns="columns"
            :data="competitors"
            default-sort="rank"
            default-sort-direction="desc"
            mobile-cards="false"
        ></b-table>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Getter} from 'vuex-class';

    @Component({})
    export default class LeagueTable extends Vue {
        @Getter('league/competitors') competitors;

        columns = [
            {
                field: 'name',
                label: 'Name',
            },
            {
                field: 'played',
                label: 'Played',
                isNumeric: true,
            },
            {
                field: 'wins',
                label: 'Wins',
                isNumeric: true,
            },
            {
                field: 'loses',
                label: 'Loses',
                isNumeric: true,
            },
            {
                field: 'rank',
                label: 'Rank',
                isNumeric: true,
                sortable: true,
            },
        ];
    }
</script>

<style scoped>

</style>
