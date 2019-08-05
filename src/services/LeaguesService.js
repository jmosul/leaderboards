import ApiProvider from './ApiProvider';
import League from '../models/League';

class LeaguesService extends ApiProvider {

    async index() {
        return this._doGet().then(
            (response) => response.data.map((league) => new League(league)),
            (error) => {
                throw error;
            }
        )
    }
}

export default new LeaguesService();
