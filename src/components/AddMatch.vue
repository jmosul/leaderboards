<template>
    <div class="panel">
        <div class="panel-heading has-background-dark has-text-light">
            Add Match
        </div>
        <div class="panel-block">
            <form name="addMatch" @submit.prevent="handleSubmit">
                <table class="add-match">
                    <tr>
                        <td>
                            <b-field
                                class="is-fullwidth"
                                label="Home"
                                label-position="on-border"
                                :type="{'is-danger': errors.has('HomeCompetitor')}"
                                :message="errors.first('HomeCompetitor')"
                            >
                                <b-select
                                    placeholder="Select Competitor"
                                    v-model="match.homeCompetitor"
                                    name="HomeCompetitor"
                                    size="is-medium"
                                    v-validate="{required: true, is_not: match.awayCompetitor}"
                                    expanded
                                >
                                    <option
                                        v-for="competitor in competitors"
                                        :value="competitor.competitorId"
                                        :key="competitor.competitorId"
                                    >
                                        {{ competitor.name }}
                                    </option>
                                </b-select>
                            </b-field>
                        </td>
                        <td rowspan="2" class="has-text-centered is-size-3">V</td>
                        <td>
                            <b-field
                                label="Away"
                                label-position="on-border"
                                :type="{'is-danger': errors.has('AwayCompetitor')}"
                                :message="errors.first('AwayCompetitor')"
                            >
                                <b-select
                                    placeholder="Select Competitor"
                                    v-model="match.awayCompetitor"
                                    size="is-medium"
                                    name="AwayCompetitor"
                                    v-validate="{required: true, is_not: match.homeCompetitor}"
                                    expanded
                                >
                                    <option
                                        v-for="competitor in competitors"
                                        :value="competitor.competitorId"
                                        :key="competitor.competitorId"
                                    >
                                        {{ competitor.name }}
                                    </option>
                                </b-select>
                            </b-field>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b-field
                                label="Home Score"
                                label-position="on-border"
                                class="is-fullwidth"
                                :type="{'is-danger': errors.has('homeScore')}"
                                :message="errors.first('homeScore')"
                            >
                                <b-input
                                    v-model="match.homeScore"
                                    placeholder="Optional"
                                    name="homeScore"
                                    v-validate="{min_value:0, required: isScoreSet('away'), numeric: true}"
                                ></b-input>
                            </b-field>
                        </td>
                        <td>
                            <b-field
                                label="Away Score"
                                label-position="on-border"
                                class="is-fullwidth"
                                :type="{'is-danger': errors.has('awayScore')}"
                                :message="errors.first('awayScore')"
                            >
                                <b-input
                                    v-validate="{min_value:0, required: isScoreSet('home'), numeric: true}"
                                    v-model="match.awayScore"
                                    name="awayScore"
                                    placeholder="Optional"
                                ></b-input>
                            </b-field>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3">
                            <b-field
                                label="Winner"
                                label-position="on-border"
                                class="is-fullwidth"
                                position="is-centered"
                                :type="{'is-danger': errors.has('victor')}"
                                :message="errors.first('victor')"
                            >
                                <b-select
                                    placeholder="Choose winner"
                                    v-model="match.victor"
                                    size="is-medium"
                                    name="victor"
                                    v-validate="{required: true}"
                                    expanded
                                >
                                    <option value="home">
                                        Home
                                    </option>
                                    <option value="away">
                                        Away
                                    </option>
                                    <option value="draw">
                                        Draw
                                    </option>
                                </b-select>
                            </b-field>
                        </td>
                    </tr>
                </table>

                <b-button
                    type="is-primary"
                    native-type="submit"
                    outlined
                    icon-left="plus"
                    :loading="adding"
                >
                    Add Match
                </b-button>
            </form>
        </div>
    </div>
</template>

<script>
    import Component from 'vue-class-component';
    import {Getter} from 'vuex-class';
    import MatchesService from '../services/MatchesService';
    import {Emit} from 'vue-property-decorator';
    import AppComponent from '../AppComponent';

    @Component({})
    export default class AddMatch extends AppComponent {
        @Getter('league/competitors') competitors;
        @Getter('league/leagueId') leagueId;

        adding = false;
        match = {};

        mounted() {
            this.resetMatch();
        }

        isScoreSet(homeAway) {
            const fieldName = `${homeAway}Score`;

            return this.match[fieldName] || this.match[fieldName] === 0 || this.match[fieldName] >= 1;
        }

        resetMatch() {
            this.match.homeCompetitor = '';
            this.match.awayCompetitor = '';
            this.match.homeScore = '';
            this.match.awayScore = '';
            this.match.victor = '';
        }

        async handleSubmit() {
            const isValid = await this.isValid();

            if (!isValid) {
                this.showMessage('Please check match details.');

                return false;
            }

            this.adding = true;

            MatchesService
                .leagueId(this.leagueId)
                .store(this.match)
                .then(
                    () => {
                        this.adding = false;
                        this.showMessage('Match added', 'is-success');
                        this.resetMatch();
                        this.$validator.reset();
                        this.onMatchAdded();
                    },
                    ({message}) => {
                        this.adding = false;
                        this.showMessage(message);
                    }
                );
        }

        async isValid() {
            return this.$validator.validateAll().then((result) => result);
        }

        @Emit('matchAdded')
        onMatchAdded() {

        }
    }
</script>

<style scoped lang="scss">
    table.add-match {
        width: 100%;

        td {
            padding: 10px 5px;

            &.has-text-centered {
                vertical-align: middle;
            }
        }
    }
</style>
