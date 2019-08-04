const ResourceController = require('./ResourceController');

const League = require('../models/Leagues');
const UserLeagues = require('../models/UserLeagues');

class LeaguesController extends ResourceController {

    async index() {
        return await this._getUserLeagueIds().then(
            async(leagueIds) => {
                if(leagueIds.length === 0) {
                    this.send([]);
                }

                return await League
                    .query({
                        leaguePool: this.leaguePool,
                        leagueId: { in: leagueIds }
                    })
                    .exec(
                        (err, leagues) => this.respond(err, leagues)
                    )
            },
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

    async _getUserLeagueIds() {
        const userId = this.userId;

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
