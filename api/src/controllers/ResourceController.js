const Controller = require('./Controller');


class ResourceController extends Controller {
    static registerRoutes(app, resourceRoute, resourceParam) {
        const routePath = this._buildLeagueRoute(resourceRoute);

        resourceParam = resourceParam || 'leagueId';

        app.get(routePath, async(req, res) => await this.handle('index', req, res));
        app.post(routePath, async(req, res) => await this.handle('store', req, res));
        app.get(`${routePath}/:${resourceParam}`, async(req, res) => await this.handle('show', req, res));

        return app;
    }
}

module.exports = ResourceController;
