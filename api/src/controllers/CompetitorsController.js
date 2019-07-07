const ResourceController = require('./ResourceController');

const Competitor = require('../models/Competitor');
const UserLeagues = require('../models/UserLeagues');

class CompetitorsController extends ResourceController {

    async index() {
        return await Competitor
            .query({
                leagueId: this.leagueId,
            })
            .exec(
                (err, competitors) => this.respond(err, competitors)
            );
    }

    async store() {
        // TODO replace with cognito current user
        const name = this.request.body.name;
        const userId = this.userId;

        if(!name || name.length === 0) {
            return this.error({
                status: 400,
                message: 'Must specify valid player name'
            });
        }

        // add user to league
        return await UserLeagues.create(
            {
                leagueId: this.leagueId,
                userId
            },
            async (err) => {
                if(!err) {
                    // create competitor profile
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

    async show() {
        return await Competitor.get({
            leagueId: this.leagueId,
            competitorId: this.userId,
        }).then(
            (competitor) => this.send(competitor),
            (error) => this.error(error)
        )
    }

    static registerRoutes(app) {
        return super.registerRoutes(app, 'competitors', 'competitorId');
    }
}

module.exports = CompetitorsController;
