import ApiProvider from './ApiProvider';

class LeaguesService extends ApiProvider {

    async index() {
        return this._doGet().then(
            (leagues) => console.log(leagues),
            (error) => {
                throw error;
            }
        )
    }
}

export default new LeaguesService();
