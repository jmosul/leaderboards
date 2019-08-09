import Vue from 'vue';
import uuidRegex from '../../utils/uuidRegex';
import CompetitorsService from '../../services/CompetitorsService';
import {Getter} from 'vuex-class';

export default class LeagueForm extends Vue {
    @Getter('user/username') username;

    leagueId = '';
    competitorName = '';

    isJoining = false;
    isCreating = false;

    get isSubmitting() {
        return this.isCreating || this.isJoining;
    }

    joinLeague() {
        if (this.validateLeagueId()) {
            this.isJoining = true;

            const data = {
                name: this.competitorName,
            };

            return CompetitorsService
                .leagueId(this.leagueId)
                .store(data)
                .then(
                    () => {

                    },
                    (error) => error
                );
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
