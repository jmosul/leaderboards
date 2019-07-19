const Controller = require('./Controller');
const Match = require('../models/Match');
const MatchesResourceCollection = require('../resources/MatchesResourceCollection');

class MatchesController extends Controller {
    async index() {
        const now = new Date();

        return await Match
            .query('leagueId')
            .eq(this.leagueId)
            .where('createdAt')
            // .lt(now)
            .descending()
            .exec(
                async (err, matches) => {
                    if(err) {
                        return this.error(err);
                    }

                    matches.forEach((match) => console.log(match.createdAt));


                    try {
                        const collection = await MatchesResourceCollection.createFromMatches(matches);

                        const response = collection.toJson();

                        return this.send(response);
                    }
                    catch(err) {
                        return this.error(err);
                    }
                }
            );
    }

    /**
     * @param app
     * @return {*}
     */
    static registerRoutes(app) {
        const leagueRoute = MatchesController._buildLeagueRoute('matches');

        app.get(leagueRoute, async(req, res) => await this.handle('index', req, res));

        return app;
    }
}

module.exports = MatchesController;
