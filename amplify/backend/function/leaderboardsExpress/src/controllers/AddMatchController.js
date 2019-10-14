const Controller = require('./Controller');
const Match = require('../models/Match');
const MatchContestant = require('../models/MatchContestant');
const Competitor = require('../models/Competitor');
const Elo = require('@pelevesque/elo');

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
                leagueId: this.leagueId,
                createdBy: this.userId,
            },
            async(err, match) => {
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

        await this._setCompetitorsFromBody();

        const elo = new Elo();

        homeContestant.preRank = this._home.rank;
        awayContestant.preRank = this._away.rank;

        const homeRank = elo.getRating(homeContestant.preRank, awayContestant.preRank, this.getEloVictor('home'));
        const awayRank = elo.getRating(awayContestant.preRank, homeContestant.preRank, this.getEloVictor('away'));

        this._home.rank = homeContestant.postRank = homeRank > 0 ? Math.round(homeRank) : 0;
        this._away.rank = awayContestant.postRank = awayRank > 0 ? Math.round(awayRank) : 0;

        await this.saveCompetitors();

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
     * @param homeAway
     * @return {number}
     */
    getEloVictor(homeAway) {
        if(this.victor === homeAway) {
            return 1;
        }
        else if(this.victor !== homeAway) {
            return 0;
        }

        return 0.5;
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
            foeId: homeAway === 'away' ? this.body.homeCompetitor : this.body.awayCompetitor,
            createdBy: this.userId,
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

    /**
     * @return {Promise<*>}
     * @private
     */
    async _setCompetitorsFromBody() {
        return new Promise((resolve, reject) => {
            Competitor.query(
                {
                    leagueId: this.leagueId,
                    competitorId: { in: [this.body.homeCompetitor, this.body.awayCompetitor] }
                }
            ).exec(
                (err, competitors) => {
                    this._setCompetitors(competitors);

                    if(err) {
                        return reject(err);
                    }

                    competitors.forEach((competitor) => {
                        const key = competitor.competitorId === this.body.homeCompetitor ? '_home' : '_away';

                        this[key] = competitor;
                    });

                    resolve();
                }
            )
        });
    }

    async saveCompetitors() {
        return Promise.all([
            this._saveHomeCompetitor(),
            this._saveAwayCompetitor(),
        ]);
    }

    async _saveHomeCompetitor() {
        return new Promise((resolve, reject) => {
           Competitor.update({
               leagueId: this.leagueId,
               competitorId: this._home.competitorId
           }, {rank: this._home.rank}, (err) => err ? reject(err) : resolve())
        });
    }

    async _saveAwayCompetitor() {
        return new Promise((resolve, reject) => {
            Competitor.update({
                leagueId: this.leagueId,
                competitorId: this._away.competitorId,
            }, {rank: this._away.rank}, (err) => err ? reject(err) : resolve())
        });
    }

    _setCompetitors(competitors) {
        this._home = competitors[0];
        this._away = competitors[1];
    }
}

module.exports = AddMatchController;
