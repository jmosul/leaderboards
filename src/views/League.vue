<template>
    <div class="league columns is-desktop">
        <section class="column is-two-thirds">
            <h1 class="title">
                <b-icon :icon="icon" pack="fas"></b-icon>
                <span>&nbsp; {{name}}</span>

                <b-button
                    class="is-pulled-right"
                    icon-left="sync"
                    icon-pack="fas"
                    :loading="loadingLeague"
                    @click="refreshLeague()"
                ></b-button>
            </h1>
            <hr>
            <league-table></league-table>

            <join-link :league-id="leagueId"></join-link>
        </section>
        <section class="column is-one-third">
            <add-match v-on:matchAdded="refreshLeague"></add-match>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AddMatch from '@/components/AddMatch';
    import LeagueTable from '@/components/LeagueTable';
    import {Action, Getter} from 'vuex-class';
    import BIcon from 'buefy/src/components/icon/Icon';
    import JoinLink from '@/components/JoinLink';

    @Component({
        components: {BIcon, LeagueTable, AddMatch, JoinLink},
    })
    export default class League extends Vue {
        @Action('league/updateLeague') refreshLeague;
        @Getter('league/leagueId') leagueId;
        @Getter('league/icon') icon;
        @Getter('league/name') name;
        @Getter('league/isLoading') loadingLeague;
    }
</script>

<style scoped></style>
