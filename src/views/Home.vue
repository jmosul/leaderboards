<template>
    <div class="home columns is-desktop">
        <section class="column is-two-thirds">
            <div class="panel">

                <p class="panel-heading has-background-info has-text-light">
                    Your Leagues
                    <span v-if="isLoading">
                    <b-icon
                        custom-class="fa-spin"
                        icon="volleyball-ball"
                        pack="fas"
                        size="is-small"
                    ></b-icon>
                </span>
                </p>
                <div class="panel-block">
                    <p class="control has-icons-left">
                        <input
                            :disabled="isLoading"
                            class="input is-small"
                            placeholder="Search"
                            type="text"
                        >
                        <b-icon icon="search" size="is-small" pack="fas" class="is-left"></b-icon>
                    </p>
                </div>
                <router-link class="panel-block" v-for="(league, index) in leagues" :key="index" :to="{ name: 'league', params: { leagueId: league.leagueId }}">
                    <b-icon v-bind:icon="league.icon" size="is-small" pack="fas" class="is-left"></b-icon>
                    {{league.name}}
                </router-link>
                <div class="panel-block has-text-grey" v-if="hasNoLeagues">
                    You have not entered any Leagues
                </div>
            </div>
        </section>

        <section class="column is-one-third">
            <div class="panel">
                <div class="panel-block">
                    <b-tabs position="is-centered" class="is-fullwidth">
                        <b-tab-item label="Join League">
                            <join-league></join-league>
                        </b-tab-item>
                        <b-tab-item label="Create League">
                            <create-league></create-league>
                        </b-tab-item>
                    </b-tabs>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Icon, Tabs} from 'buefy';
    import LeaguesService from '../services/LeaguesService';
    import JoinLeague from '../components/LeagueForms/JoinLeague';
    import CreateLeague from '../components/LeagueForms/CreateLeague';
    import {Getter} from 'vuex-class';

    Vue.use(Icon);
    Vue.use(Tabs);

    @Component({
        components: {
            CreateLeague,
            JoinLeague,
        },
    })
    export default class Home extends Vue {
        @Getter('league/leaguePool') leaguePool;

        leagues = [];

        loadingLeagues = true;

        get isLoading() {
            return this.loadingLeagues;
        }

        get hasNoLeagues() {
            return !this.isLoading && this.leagues.length === 0;
        }

        mounted() {
            LeaguesService.index({leaguePool: this.leaguePool})
                .then((leagues) => {
                    this.leagues = leagues;
                    this.loadingLeagues = false;
                })
                .catch((error) => console.log(error));
        }
    }
</script>
