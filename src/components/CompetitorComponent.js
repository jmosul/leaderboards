import AppComponent from '../AppComponent';
import {Getter} from 'vuex-class';

export default class CompetitorComponent extends AppComponent {
    @Getter('league/competitors') leagueCompetitors;

    /** @var {Competitor|{}} _competitor */
    _competitor = {};

    /**
     * @returns {string}
     */
    get competitorId() {
        return this.$route.params.competitorId;
    }

    /**
     * @returns {Competitor|undefined}
     */
    get competitor() {
        if(this._competitor && this._competitor.competitorId === this.competitorId) {
            return this._competitor;
        }

        return this._competitor = this.leagueCompetitors.filter(
            (competitor) => competitor.competitorId === this.competitorId
        )[0] || {};
    }

    get leaguePosition() {
        return this.leagueCompetitors.findIndex((competitor) => competitor.competitorId === this.competitorId) + 1;
    }
}
