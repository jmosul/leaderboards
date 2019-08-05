class Controller {

    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    get params() {
        return this.request.params;
    }

    get body() {
        return this.request.body;
    }

    get apiEvent() {
        return this.request.apiGateway.event;
    }

    /**
     * @return {string|undefined}
     */
    get leagueId() {
        return this.params.leagueId;
    }

    /**
     * @return {string}
     */
    get leaguePool() {
        return process.env.LEAGUE_POOL;
    }

    get userId() {
        if(!this.cognitoUser) {
            const provider = this.apiEvent.requestContext.identity.cognitoAuthenticationProvider || '';

            const providerParts = provider.split('CognitoSignIn:');

            if(providerParts.length !== 2) {
                throw {error: 400, message: 'No User Provider'};
            }

            this.cognitoUser = providerParts[1];
        }

        return this.cognitoUser;
    }

    respond(err, data) {
        return err ? this.error(err) : this.send(data);
    }

    send(data) {
        const response = {
            data
        };

        const json = JSON.stringify(response);

        this.response.send(json);

        return true;
    }

    error(data) {
        console.log( 'ERRORR' );

        this.response.status(500);

        return this.send(data);
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
    static _buildLeagueRoute(resourceRoute) {
        return resourceRoute ? `/leagues/:leagueId/${resourceRoute}` : '/leagues';
    }
}

module.exports = Controller;
