const MatchContestant = require('./models/MatchContestant');
const Competitor = require('./models/Competitor');

class CalculateCompetitorStats {
    /**
     * @param {string} leagueId
     * @param {string} competitorId
     */
    constructor(leagueId, competitorId) {
        this.leagueId = leagueId;
        this.competitorId = competitorId;
    }

    handle() {
        this._resetCounts();

        return this._updateCounts()
            .then(() => this._updateCompetitor())
            .catch((err) => {
                throw err;
            })
    }

    /**
     * @return {Promise<boolean>}
     * @private
     */
    async _updateCounts() {
        return new Promise((resolve, reject) => {
            MatchContestant
                .query({
                    leagueId: {eq: this.leagueId},
                    competitorId: {eq: this.competitorId}
                })
                .exec(
                    (err, matchContestants) => {
                        if (err) {
                            reject(err);
                        } else {
                            matchContestants.forEach((matchContestant) => {
                                console.log( matchContestant );

                                return this._countResult(matchContestant)
                            });

                            console.log(
                                this.played,
                                this.wins,
                                this.draws,
                                this.loses
                            );
                        }
                    }
                );

            resolve(true);
        });
    }

    /**
     * @return {Promise<*>}
     * @private
     */
    async _updateCompetitor() {
        const competitorUpdates = {
            played: this.played,
            wins: this.wins,
            draws: this.draws,
            loses: this.loses
        };
        
        console.log( 'comp', competitorUpdates );

        return new Promise((resolve, reject) => {
            Competitor.update({
                leagueId: this.leagueId,
                competitorId: this.competitorId
            }, competitorUpdates, (err) => err ? reject(err) : resolve())
        });
    }

    /**
     * @param {MatchContestant} matchContestant
     * @private
     */
    _countResult(matchContestant) {
        this.played++;

        switch(matchContestant.result) {
            case MatchContestant.RESULT.WIN:
                this.wins++;
                break;

            case MatchContestant.RESULT.LOSE:
                this.loses++;
                break;

            case MatchContestant.RESULT.DRAW:
            default:
                this.draws++;
                break;
        }
    }

    /**
     * @private
     */
    _resetCounts() {
        this.played = 0;
        this.wins = 0;
        this.draws = 0;
        this.loses = 0;
    }
}

module.exports = CalculateCompetitorStats;
