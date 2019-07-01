const Controller = require('./Controller');

const Competitor = require('../models/Competitors');
const League = require('../models/Leagues');
const UserLeagues = require('../models/UserLeagues');

class LeaguesController extends Controller {

    async index() {
        return await this._getUserLeagueIds().then(
            async(leagueIds) => await League
                .query({
                    leaguePool: this.leaguePool,
                    leagueId: { in: leagueIds }
                })
                .exec(
                    (err, leagues) => this.respond(err, leagues)
                ),
            (err) => this.error(err)
        )
    }

    async show() {
        return await League.get({
            leaguePool: this.leaguePool,
            leagueId: this.leagueId,
        }).then(
            (league) => this.send(league),
            (error) => this.error(error)
        )
    }

    async store() {
        const name = this.request.body.name;

        if(!name || name.length === 0) {
            return this.error({
                status: 400,
                message: 'Must specify valid league name'
            });
        }

        return await League.create(
            {
                leaguePool: this.leaguePool,
                name
            },
            (err, league) => this.respond(err, league)
        );
    }

    async join() {
        // TODO replace with cognito current user
        const userId = 'jmosul';
        const name = this.request.body.name;

        if(!name || name.length === 0) {
            return this.error({
                status: 400,
                message: 'Must specify valid player name'
            });
        }

        return await UserLeagues.create(
            {
                leagueId: this.leagueId,
                userId
            },
            async (err) => {
                if(!err) {
                    return await Competitor.create(
                        {
                            leagueId: this.leagueId,
                            competitorId: userId,
                            name
                        },
                        (err, competitor) => this.respond(err, competitor)
                    );
                }

                return this.respond(err)
            }
        );
    }

    static registerRoutes(app) {
        app = super.registerRoutes(app, 'leagues', 'leagueId');

        app.post('/leagues/:leagueId/join', async(req, res) => await this.handle('join', req, res));

        return app;
    }

    async _getUserLeagueIds() {
        // TODO replace with cognito current user
        const userId = 'jmosul';

        return await UserLeagues
            .query('userId')
            .eq(userId)
            .exec(async(err, userLeagues) => {
                    if(err) {
                        throw err;
                    }

                    return userLeagues.map(
                        (userLeague) => userLeague.leagueId
                    );
                }
            );
    }
}


module.exports = LeaguesController;
