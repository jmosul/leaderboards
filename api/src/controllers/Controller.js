class Controller {

    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    /**
     * @return {string|undefined}
     */
    get leagueId() {
        return this.request.params.leagueId;
    }

    /**
     * @return {string}
     */
    get leaguePool() {
        return process.env.LEAGUE_POOL;
    }

    get userId() {
        // TODO replace with cognito current user
        return 'jmosul';
    }

    respond(err, data) {
        return err ? this.error(err) : this.send(data);
    }

    send(data) {
        const json = JSON.stringify(data);

        this.response.send(json);

        return true;
    }

    error(data) {
        const json = JSON.stringify(data);

        this.response.send(json);

        return true;
    }

    static registerRoutes(app, resourceRoute, resourceParam) {
        const routePath = resourceRoute ? `/leagues/:leagueId/${resourceRoute}` : '/leagues';

        resourceParam = resourceParam || 'leagueId';

        app.get(routePath, async(req, res) => await this.handle('index', req, res));
        app.post(routePath, async(req, res) => await this.handle('store', req, res));
        app.get(`${routePath}/:${resourceParam}`, async(req, res) => await this.handle('show', req, res));

        return app;
    }

    static async handle(method, request, response) {
        const controller = new this(request, response);

        if(!controller[method]) {
            return controller.error({
                status: 402,
                message: 'Method not implemented'
            })
        }

        return await controller[method]();
    }
}

module.exports = Controller;
