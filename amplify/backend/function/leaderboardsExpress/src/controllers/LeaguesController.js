const ResourceController = require('./ResourceController');

const League = require('../models/Leagues');
const UserLeagues = require('../models/UserLeagues');

class LeaguesController extends ResourceController {

    async index() {
        const leagueIds = await this._getUserLeagueIds().then(
            (leagueIds) => leagueIds,
            (error) => {
                throw error
            }
        );

        return await this._getLeaguesByIds(leagueIds).then(
            (leagues) => this.send(leagues),
            (error) => this.error(error)
        );
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
        const icon = this.request.body.icon;

        if(!name || name.length === 0) {
            return this.error({
                status: 400,
                message: 'Must specify valid league name'
            });
        }

        return await League.create(
            {
                leaguePool: this.leaguePool,
                name,
                icon
            },
            (err, league) => this.respond(err, league)
        );
    }

    async _getLeaguesByIds(leagueIds) {
        return new Promise((resolve, reject) => {

        if(!leagueIds || leagueIds.length === 0) {
            resolve([]);
        }

        League.query('leaguePool')
            .eq(this.leaguePool)
            .where(leagueId)
            .in(leagueIds)
            .exec(
                (err, leagues) => {
                    if(err) {
                        reject(err);
                    }

                    resolve(leagues);
                }
            );
        });
    }

    async _getUserLeagueIds() {
        const userId = this.userId;

        return new Promise((resolve, reject) => {
            UserLeagues.query(
                {
                    userId: { eq: userId }
                },
                (err, userLeagues) => {
                    if(err) {
                        reject(err);
                    }

                    const leagueIds = userLeagues.map((userLeague) => userLeague.leagueId);

                    resolve(leagueIds);
                }
            );
        });
    }
}


module.exports = LeaguesController;
