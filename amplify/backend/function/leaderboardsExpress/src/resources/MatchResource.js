const MatchContestant = require('../models/MatchContestant');

class MatchResource {
    constructor(match) {
        this._match = match;

        this._home = {};
        this._away = {};
    }

    get leagueId() {
        return this._match.leagueId
    }

    get matchId() {
        return this._match.matchId;
    }

    get date() {
        return this._match.createdAt;
    }

    get victor() {
        switch(this._home.matchContestant && this._home.matchContestant.result) {
            case MatchContestant.RESULT.WIN:
                return 'home';

            case MatchContestant.RESULT.LOSE:
                return 'away';

            case MatchContestant.RESULT.DRAW:
            default:
                return 'draw';
        }
    }

    /**
     * @param {string} homeAway
     * @param {MatchContestant} matchContestant
     * @param {Competitor} competitor
     * @return {MatchResource}
     */
    associateMatchContestant(matchContestant, competitor) {
        const key = this._home.matchContestant ? '_away' : '_home';

        this[key].matchContestant = matchContestant;
        this[key].competitor = competitor;

        return this;
    }

    toJson() {
        return {
            leagueId: this.leagueId,
            matchId: this.matchId,
            date: this.date,
            homeCompetitor: this.competitorToJson('home'),
            awayCompetitor: this.competitorToJson('away'),
            victor: this.victor
        };
    }

    competitorToJson(homeAway) {
        const key = `_${homeAway}`;

        return  {
            competitorId: this[key].competitor.competitorId,
            name: this[key].competitor.name,
            rank: this[key].matchContestant.postRank, // || this[key].competitor.rank || 0,
            score: this[key].matchContestant.score,
            result: this[key].matchContestant.result,
        }
    }
}

module.exports = MatchResource;
