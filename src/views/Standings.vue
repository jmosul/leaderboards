<template>
    <div class="league columns is-desktop">
        <section class="column is-two-thirds">
            <league-table></league-table>

            <join-link :league-id="leagueId" text="Invite Link"></join-link>
        </section>
        <section class="column is-one-third">
            <add-match v-on:matchAdded="refreshLeague"></add-match>
        </section>
    </div>
</template>

<script>
    import Component from 'vue-class-component';
    import AddMatch from '@/components/AddMatch';
    import LeagueTable from '@/components/LeagueTable';
    import {Action, Getter} from 'vuex-class';
    import BIcon from 'buefy/src/components/icon/Icon';
    import JoinLink from '@/components/JoinLink';
    import AppComponent from '../AppComponent';

    @Component({
        components: {BIcon, LeagueTable, AddMatch, JoinLink},
    })
    export default class League extends AppComponent {
        @Action('league/updateLeague') refreshLeague;
        @Getter('league/leagueId') leagueId;
        @Getter('league/icon') icon;
        @Getter('league/name') name;
        @Getter('league/isLoading') loadingLeague;
    }
</script>

<style scoped></style>
