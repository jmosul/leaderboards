<template>
    <div class="competitor columns is-desktop">
        <div class="column is-one-third">
            <section class="competitor__profile">
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <b-icon pack="fas" icon="user" size="is-large"></b-icon>
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{competitor.name}}</p>
                                <p class="subtitle is-6">Rank: {{competitor.rank}}</p>
                            </div>
                        </div>

                        <div class="content">
                            <table>
                                <tr>
                                    <th>Position</th>
                                    <td>{{leaguePosition}}/{{leagueCompetitors.length}}</td>
                                </tr>
                                <tr>
                                    <th>Played</th>
                                    <td>{{competitor.played}}</td>
                                </tr>
                                <tr>
                                    <th>Wins</th>
                                    <td>{{competitor.wins}}</td>
                                </tr>
                                <tr>
                                    <th>Loses</th>
                                    <td>{{competitor.loses}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="column is-two-thirds">
            <section class="competitor__matches">
                <h3 class="title is-4">
                    Recent Matches
                </h3>
                <hr>
                <p class="has-text-grey-light">Coming soon...<br><br><br></p>
            </section>

            <section class="competitor__matches">
                <h3 class="title is-4">
                    Head to Head Matches
                </h3>
                <hr>
                <p class="has-text-grey-light">Coming soon...</p>
            </section>
        </div>
    </div>
</template>

<script>
    import Component from 'vue-class-component';
    import CompetitorComponent from '../components/CompetitorComponent';
    import BIcon from 'buefy/src/components/icon/Icon';
    import MatchesService from '../services/MatchesService';

    @Component({
        components: {BIcon}
    })
    export default class Competitor extends CompetitorComponent {

        mounted() {
            // this.loadRecentMatches();
        }

        loadRecentMatches() {
            return MatchesService.index().then(
                (matches) => {
                    this.recentMatches = matches;

                    console.log( matches );
                },
                (error) => this.showMessage(error.message)
            );
        }
    }
</script>

<style scoped lang="scss">
    .media-content {
        .title {
            margin-top: 0;
        }
    }
</style>
