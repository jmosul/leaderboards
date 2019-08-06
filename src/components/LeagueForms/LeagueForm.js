import Vue from 'vue';
import uuidRegex from '../../utils/uuidRegex';
import CompetitorsService from '../../services/CompetitorsService';

export default class LeagueForm extends Vue {
    leagueId = '5d53fda2-e835-452b-941f-e40c540ea56b';

    isJoining = false;
    isCreating = false;

    get isSubmitting() {
        return this.isCreating || this.isJoining;
    }

    joinLeague() {
        if (this.validateLeagueId()) {
            this.isJoining = true;

            // TODO get from cognito
            const name = 'James';

            const data = {
                name,
            };

            return CompetitorsService
                .leagueId(this.leagueId)
                .store(data)
                .then(console.log);
        }
    }

    validateLeagueId() {
        if (this.leagueId) {
            this.leagueId = this.leagueId.substring(0, 36);

            return uuidRegex.test(this.leagueId);
        }

        return false;
    }
}
