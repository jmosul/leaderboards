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
    async static getMatchContestants(leagueId, matches) {
        const matchIds = matches.map((match) => match.matchId);

        return await MatchContestant.query({
            leagueId,
            matchId: { in: matchIds }
        }).exec(
            (err, contestants) => {
                if(err) {
                    throw err;
                }

                return contestants;
            }
        );
    }

    async static getCompetitorsFromContestants(leagueId, contestants) {
        const competitorIds = contestants.map((competitor) => competitor.competitorId);

        return await Competitor.query({
            leagueId,
            competitorId: { in: competitorIds }
        }).exec(
            (err, competitors) => {
                if(err) {
                    throw err;
                }

                const mappedCompetitors = {};

                competitors.forEach((competitor) => {
                   mappedCompetitors[competitor.competitorId] = competitor;
                });

                return mappedCompetitors;
            }
        );
    }

    /**
     * @param {Array<Match>}matches
     */
    async static createFromMatches(matches) {
        if(matches.length === 0) {
            return new MatchesResourceCollection();
        }

        const matchResources = {};

        let leagueId;

        matches.forEach((match) => {
            matchResources[match.matchId] = new MatchResource(match);

            leagueId = matchResources[match.matchId].leagueId;
        });

        const matchContestants = await this.getMatchContestants(leagueId, Object.values(matches));
        const competitors = await this.getCompetitorsFromContestants(leagueId, matchContestants);

        matchContestants.forEach((matchContestant) => {
            const matchId = matchContestant.matchId;

            const competitor = competitors[matchContestant.competitorId];

            matches[matchId].associateMatchContestant(matchContestant, competitor);
        });

        return new MatchesResourceCollection(Object.values(matches));
    }
}

module.exports = MatchesResourceCollection;
