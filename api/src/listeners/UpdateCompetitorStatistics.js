import Competitor from '../models/Competitor';
import MatchContestant from '../models/MatchContestant';

class UpdateCompetitorStatistics {

    get competitor() {
        return this._competitor;
    }

    get contestants() {
        return this._contestants || [];
    }

    async handle() {

        // TODO set competitor

        await this._setContestantsFromCompetitor();

        this._updateStats();

        await this._competitor.save();
    }

    _updateStats() {
        this._competitor.played = 0;
        this._competitor.wins = 0;
        this._competitor.loses = 0;
        this._competitor.draws = 0;

        this.contestants.forEach((contestant) => {
            this._competitor.played++;

            switch(contestant.result) {
                case MatchContestant.RESULT.WIN:
                    return this._competitor.wins++;

                case MatchContestant.RESULT.LOSE:
                    return this._competitor.loses++;

                case MatchContestant.RESULT.DRAW:
                default:
                    return this._competitor.draws++;
            }
        });
    }


    async _setContestantsFromCompetitor() {
        return new Promise((resolve, reject) => {
            MatchContestant.query(this.competitor.leagueId)
                .where('matchContestantId')
                .eq(this.competitor.competitorId)
                .exec((err, contestants) => {
                    if(err) {
                        return reject(err);
                    }

                    this._contestants = contestants;

                    return resolve(this._contestants);
                })
        });
    }


}
