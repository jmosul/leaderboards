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

    /**
     * @param {string|undefined} resourceRoute
     * @return {string}
     * @private
     */
    static _buildResourceRoute(resourceRoute) {
        return resourceRoute ? `/leagues/:leagueId/${resourceRoute}` : '/leagues';
    }
}

module.exports = Controller;
