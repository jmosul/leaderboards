import LeagueApiProvider from './LeagueApiProvider';

class MatchesService extends LeagueApiProvider {
    /**
     * @param {object} data
     * @return {Promise<League | never>}
     */
    async store(data = {}) {
        return this._doPost('', data).then(
            (response) => response.data,
            (error) => {
                throw error;
            }
        );
    }

    get basePath() {
        return `${super.basePath}/matches`;
    }
}

export default new MatchesService();
