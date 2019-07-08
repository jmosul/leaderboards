const Controller = require('./Controller');
const Match = require('../models/Match');
const MatchesResourceCollection = require('../resources/MatchesResourceCollection');

class AddMatchController extends Controller {

    async index() {
        return await this._getUserLeagueIds().then(
            async(leagueIds) => await Match
                .query({
                    leaguePool: this.leaguePool,
                    leagueId: { in: leagueIds }
                })
                .exec(
                    async (err, matches) => {
                        if(err) {
                            return this.error(err);
                        }

                        try {
                            const collection = await MatchesResourceCollection.createFromMatches(matches);

                            return collection.toJson();
                        }
                        catch(err) {
                            return this.error(err);
                        }

                    }
                ),
            (err) => this.error(err)
        )
    }

    /**
     * @param app
     * @return {*}
     */
    static registerRoutes(app) {
        const leagueRoute = AddMatchController._buildLeagueRoute('matches');

        app.get(leagueRoute, async(req, res) => await this.handle('index', req, res));

        return app;
    }
}

module.exports = AddMatchController;
