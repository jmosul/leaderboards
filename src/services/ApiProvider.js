import {API} from 'aws-amplify';

export default class ApiProvider {
    apiName = 'leaguesApi';
    _basePath = '/leagues';

    get basePath() {
        return this._basePath;
    }

    get defaultHeaders() {
        return {
            'content-type': 'application/json',
        };
    }

    /**
     * @param path
     * @param queryStringParameters
     * @return {Promise<*>}
     * @protected
     */
    async _doGet(path, queryStringParameters = {}) {
        const config = Object.assign({queryStringParameters}, this.defaultHeaders);

        return API.get(this.apiName, this._buildFullPath(path), config);
    }

    /**
     * @param path
     * @param body
     * @return {Promise<*>}
     * @private
     */
    async _doPost(path, body = {}) {
        const config = Object.assign({body}, this.defaultHeaders);

        return API.post(this.apiName, this._buildFullPath(path), config);
    }

    /**
     * @param path
     * @param body
     * @return {Promise<*>}
     * @private
     */
    async _doPut(path, body = {}) {
        const config = Object.assign({body}, this.defaultHeaders);

        return API.put(this.apiName, this._buildFullPath(path), config);
    }

    /**
     * @param path
     * @return {Promise<*>}
     * @private
     */
    async _goDelete(path) {
        const config = Object.assign({}, this.defaultHeaders);

        return API.delete(this.apiName, this._buildFullPath(path), config);
    }

    /**
     * @param {string} path
     * @return {string}
     * @private
     */
    _buildFullPath(path) {
        path = path && path.length ? `/${path}` : '';

        return `${this.basePath}${path}`;
    }
}
