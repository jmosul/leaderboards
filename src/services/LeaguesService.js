import ApiProvider from './ApiProvider';
import League from '../models/League';

class LeaguesService extends ApiProvider {
    /**
     * @param {string} leaguePool
     * @param {string} leagueId
     * @return {Promise<League>}
     */
    async show(leaguePool, leagueId) {
        return this._doGet(leagueId, {leaguePool}).then(
            (response) => new League(response.data),
            (error) => {
                throw error;
            }
        );
    }

    /**
     * @return {Promise<Array<League>>}
     */
    async index(params = {}) {
        return this._doGet('', params).then(
            (response) => response.data.map((league) => new League(league)),
            (error) => {
                throw error;
            }
        );
    }

    /**
     * @param {object} data
     * @return {Promise<League | never>}
     */
    async store(data = {}) {
        return this._doPost('', data).then(
            (response) => new League(response.data),
            (error) => {
                throw error;
            }
        );
    }
}

export default new LeaguesService();
