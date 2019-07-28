const Competitor = require('../models/Competitor');
const MatchResource = require('./MatchResource');
const MatchContestant = require('../models/MatchContestant');

class MatchesResourceCollection {

    /**
     * @param {array<MatchResource>} matchesResources
     */
    constructor(matchesResources = []) {
        this._items = matchesResources;
    }

    /**
     * @return {Array<object>}
     */
    toJson() {
        return this._items.map((item) => item.toJson());
    }

    /**
     * @param {string} leagueId
     * @param {Array<MatchResource>} matches
     */
    static async getMatchContestants(leagueId, matches) {
        const matchIds = matches.map((match) => match.matchId);

        return new Promise((resolve, reject) => {
            MatchContestant.query({
                    leagueId,
                    matchId: { in: matchIds }
                },
                (err, contestants) => {
                    if(err) {
                        reject(err);
                    }

                    resolve(contestants);
                }
            );

        });
    }

    static async getCompetitorsFromContestants(leagueId, contestants) {
        return new Promise((resolve, reject) => {
            const competitorIds = contestants.map((competitor) => competitor.competitorId);

            Competitor.query({
                leagueId,
                competitorId: { in: competitorIds }
            }).exec(
                (err, competitors) => {
                    if(err) {
                        reject(err);
                    }

                    const mappedCompetitors = {};

                    competitors.forEach((competitor) => {
                        mappedCompetitors[competitor.competitorId] = competitor;
                    });

                    resolve(mappedCompetitors);
                }
            );

        });
    }

    /**
     * @param {Array<Match>}matches
     */
    static async createFromMatches(matches) {
        return new Promise((resolve, reject) => {

            if(matches.length === 0) {
                resolve(new MatchesResourceCollection());
            }

            const matchResources = {};

            let leagueId;

            matches.forEach((match) => {
                matchResources[match.matchId] = new MatchResource(match);

                leagueId = matchResources[match.matchId].leagueId;
            });

            this.getMatchContestants(leagueId, Object.values(matchResources)).then(
                (matchContestants) => {
                    this.getCompetitorsFromContestants(leagueId, matchContestants).then(
                        (competitors) => {
                            matchContestants.forEach((matchContestant) => {
                                const matchId = matchContestant.matchId;

                                const competitor = competitors[matchContestant.competitorId];

                                matchResources[matchId].associateMatchContestant(matchContestant, competitor);
                            });

                            const collection = new MatchesResourceCollection(Object.values(matchResources));

                            resolve(collection);
                        },
                        (error) => reject(error)
                    );
                },
                (err) => reject(err)
            );
        });
    }
}

module.exports = MatchesResourceCollection;
