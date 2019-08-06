<template>
    <div class="home">
        <section class="panel">
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
            <a class="panel-block" v-for="(league, index) in leagues" :key="index">
                <b-icon v-bind:icon="league.icon" size="is-small" pack="fas" class="is-left"></b-icon>
                {{league.name}}
            </a>
            <div class="panel-block has-text-grey" v-if="hasNoLeagues">
                You have not entered any Leagues
            </div>

            <div class="panel-block">
                <join-league></join-league>
            </div>

            <div class="panel-block">
                <create-league></create-league>
            </div>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Icon} from 'buefy';
    import LeaguesService from '../services/LeaguesService';
    import JoinLeague from '../components/LeagueForms/JoinLeague';
    import CreateLeague from '../components/LeagueForms/CreateLeague';

    Vue.use(Icon);

    @Component({
        components: {
            CreateLeague,
            JoinLeague,
        },
    })
    export default class Home extends Vue {
        leagues = [];

        loadingLeagues = true;

        get isLoading() {
            return this.loadingLeagues;
        }

        get hasNoLeagues() {
            return !this.isLoading && this.leagues.length === 0;
        }

        mounted() {
            LeaguesService.index()
                .then((leagues) => {
                    this.leagues = leagues;
                    this.loadingLeagues = false;
                })
                .catch((error) => console.log(error));
        }
    }
</script>
