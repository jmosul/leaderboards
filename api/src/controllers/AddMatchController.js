const Controller = require('./Controller');
const Match = require('../models/Match');
const MatchContestant = require('../models/MatchContestant');

class AddMatchController extends Controller {

    async addMatch() {
        const errors = this._getValidationErrors();

        if(errors.length > 0) {
            return {
                status: 400,
                errors
            }
        }

        return await Match.create(
            {
                leagueId: this.leagueId
            },
            async (err, match) => {
                if(err) {
                    return this.error(err);
                }

                this.match = match;

                return await this._createMatchContestants()
            }
        );
    }

    /**
     * @param app
     * @return {*}
     */
    static registerRoutes(app) {
        const leagueRoute = AddMatchController._buildLeagueRoute('matches');

        app.post(leagueRoute, async(req, res) => await this.handle('addMatch', req, res));

        return app;
    }

    /**
     * @return {Promise<ModelSchema<{result: string, leagueId: string, foeId: *, competitorId: *, matchId: (matchId|{trim, type}|{default, trim, type})}>[]>}
     * @private
     */
    async _createMatchContestants() {
        const homeContestant = this._getBaseContestant('home');
        const awayContestant = this._getBaseContestant('away');

        return await MatchContestant.batchPut(
            [
                homeContestant,
                awayContestant,
            ],
            (err) => this.respond(err, this.match)
        )
    }

    /**
     * @return {string}
     */
    get victor() {
        return this.body.victor || MatchContestant.RESULT.DRAW;
    }

    /**
     * @param {string} homeAway
     * @return {{result: string, leagueId: string, foeId: *, competitorId: *, matchId: (matchId|{trim, type}|{default, trim, type})}}
     * @private
     */
    _getBaseContestant(homeAway) {
        return {
            leagueId: this.leagueId,
            matchId: this.match.matchId,
            result: this._getParsedResult(homeAway),
            competitorId: homeAway === 'home' ? this.body.homeCompetitor : this.body.awayCompetitor,
            foeId: homeAway === 'away' ? this.body.homeCompetitor : this.body.awayCompetitor
        };
    }

    _getValidationErrors() {
        return [];
    }

    /**
     * @param {string} competitor
     * @return {string}
     * @private
     */
    _getParsedResult(competitor) {
        switch(this.victor) {
            case competitor:
                return MatchContestant.RESULT.WIN;

            case MatchContestant.RESULT.DRAW:
                return MatchContestant.RESULT.DRAW;

            default:
                return MatchContestant.RESULT.LOSE;
        }
    }
}

module.exports = AddMatchController;
