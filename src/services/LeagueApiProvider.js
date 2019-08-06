import ApiProvider from './ApiProvider';

export default class LeagueApiProvider extends ApiProvider {
    _leagueId = undefined;

    /**
     * @param {string} leagueId
     * @return {this}
     */
    leagueId(leagueId) {
        this._leagueId = leagueId;

        return this;
    }

    /**
     * @return {string}
     */
    get basePath() {
        return `${super.basePath}/${this._leagueId}`;
    }
}
