<template>
    <div class="panel">
        <b-table
            :data="competitors"
            default-sort="rank"
            default-sort-direction="desc"
            :mobile-cards="false"
        >
            <template slot-scope="props">
                <b-table-column field="name" label="Name">
                    <router-link :to="{name: 'competitor', params: {leagueId, competitorId: props.row.competitorId}}">
                        {{ props.row.name }}
                    </router-link>
                </b-table-column>

                <b-table-column field="played" label="Played" numeric>
                    {{ props.row.played }}
                </b-table-column>

                <b-table-column field="wins" label="Wins" numeric>
                    {{ props.row.wins }}
                </b-table-column>

                <b-table-column field="loses" label="Loses" numeric>
                    {{ props.row.loses }}
                </b-table-column>

                <b-table-column field="rank" label="Rank" numeric sortable>
                    {{ props.row.rank }}
                </b-table-column>

            </template>
        </b-table>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Getter} from 'vuex-class';

    @Component({})
    export default class LeagueTable extends Vue {
        @Getter('league/competitors') competitors;
        @Getter('league/leagueId') leagueId;
    }
</script>

<style scoped>

</style>
