import {API} from 'aws-amplify';

export default class ApiProvider {
    apiName = 'leaguesApi';

    get basePath() {
        return '/leagues';
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

        return await API.get(this.apiName, this._buildFullPath(path), config);
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

        return await API.post(this.apiName, this._buildFullPath(path), config);
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

        return await API.put(this.apiName, this._buildFullPath(path), config);
    }

    /**
     * @param path
     * @return {Promise<*>}
     * @private
     */
    async _goDelete(path) {
        return await API.delete(this.apiName, this._buildFullPath(path), config);
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
