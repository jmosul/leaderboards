import LeagueApiProvider from './LeagueApiProvider';
import Competitor from '../models/Competitor';

class CompetitorsService extends LeagueApiProvider {
    /**
     * @param {object} data
     * @return {Promise<Competitor>}
     */
    async store(data) {
        return this._doPost(CompetitorsService._competitorsPath, data).then(
            (response) => new Competitor(response.data),
            (error) => {
                throw error;
            }
        );
    }

    static get _competitorsPath() {
        return 'competitors';
    }
}

export default new CompetitorsService();