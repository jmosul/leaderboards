import {API} from 'aws-amplify';

export default class ApiProvider {
    apiName = 'leaguesApi';
    _basePath = '/leagues';

    get basePath() {
        return this._basePath;
    }

    /**
     * @param path
     * @param queryStringParameters
     * @return {Promise<*>}
     * @protected
     */
    async _doGet(path, queryStringParameters = {}) {
        const config = {
            queryStringParameters
        };

        return API.get(this.apiName, this._buildFullPath(path), config);
    }

    /**
     * @param path
     * @param body
     * @return {Promise<*>}
     * @private
     */
    async _doPost(path, body = {}) {
        const config = {
            body
        };

        return API.post(this.apiName, this._buildFullPath(path), config);
    }

    /**
     * @param path
     * @param body
     * @return {Promise<*>}
     * @private
     */
    async _doPut(path, body = {}) {
        const config = {
            body
        };

        return API.put(this.apiName, this._buildFullPath(path), config);
    }

    /**
     * @param path
     * @return {Promise<*>}
     * @private
     */
    async _goDelete(path) {
        return API.delete(this.apiName, this._buildFullPath(path));
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
