const Controller = require('./Controller');

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

        if(!name && name.length) {
            return this.error({
                status: 400,
                message: 'Must specify valid league name'
            });
        }

        const league = new League({
            leaguePool: this.leaguePool,
            name
        });

        return league.save((err) => this.respond(err, league));
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
