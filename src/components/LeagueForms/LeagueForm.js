import uuidRegex from '../../utils/uuidRegex';
import CompetitorsService from '../../services/CompetitorsService';
import {Action, Getter} from 'vuex-class';
import AppComponent from '../../AppComponent';

export default class LeagueForm extends AppComponent {
    @Getter('user/username') username;
    @Action('user/updateLeagues') updateUserLeagues;

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
                name: this.username,
            };

            return CompetitorsService
                .leagueId(this.leagueId)
                .store(data)
                .then(
                    () => {
                        this.showMessage('League joined!', 'is-success');
                        this.updateUserLeagues();

                        this.$router.go('league', {leagueId: this.leagueId})
                    },
                    (error) => {
                        this.showMessage('There was a problem trying to join this league.');
                        error
                    }
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
