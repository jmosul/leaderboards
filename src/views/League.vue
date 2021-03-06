<template>
    <div class="league mb-15">
        <section class="hero is-secondary">
            <div class="hero-body">
                <div class="container is-pulled-left">
                    <h1 class="title ml-10">
                        <b-icon :icon="icon" pack="fas"></b-icon>
                        <span>
                            &nbsp;
                            <router-link :to="{ name: 'standings', params: { 'leagueId': leagueId }}">{{name}}</router-link>
                        </span>
                    </h1>
                    <h2 class="subtitle" v-if="leagueLeader">
                        Leader: {{leagueLeader.name}} ({{leagueLeader.rank}})
                    </h2>
                </div>
                <div class="is-pulled-right">
                    <b-button
                        class="mr-10"
                        type="is-secondary"
                        outlined
                        inverted
                        icon-left="sync"
                        icon-pack="fas"
                        :loading="loadingLeague"
                        @click="refreshLeague()"
                    ></b-button>
                    <join-link :league-id="leagueId" type="is-secondary is-outlined is-inverted"></join-link>
                </div>
            </div>
        </section>
        <div class="container">
            <div v-if="showBackButton" class="league__back">
                <router-link
                    class="button mt-15"
                    :to="{name: 'standings', params: {leagueId}}"
                >
                    <b-icon icon="arrow-left" pack="fas"></b-icon>
                    &nbsp;
                    Return to League Standings
                </router-link>
            </div>

            <router-view></router-view>
        </div>
        <b-loading :active.sync="isFirstLoading"></b-loading>
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
        @Getter('league/competitors') competitors;

        /**
         * @returns {Competitor|undefined}
         */
        get leagueLeader() {
            return this.competitors.length ? this.competitors.sort((a, b) => b.rank - a.rank)[0] : undefined;
        }

        /**
         * @returns {boolean}
         */
        get isFirstLoading() {
            return this.loadingLeague && !this.name;
        }

        /**
         * @returns {boolean}
         */
        get showBackButton() {
            return !this.$route.meta.hideBackButton;
        }
    }
</script>

<style scoped lang="scss">
    .league {
        .hero {
            a {
                color: #FFF;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
