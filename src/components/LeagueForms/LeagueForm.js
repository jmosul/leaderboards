import uuidRegex from '../../utils/uuidRegex';
import CompetitorsService from '../../services/CompetitorsService';
import {Action, Getter} from 'vuex-class';
import AppComponent from '../../AppComponent';

export default class LeagueForm extends AppComponent {
    @Getter('user/username') username;
    @Getter('user/leagueIds') userLeagueIds;
    @Action('user/updateLeagues') updateUserLeagues;

    leagueId = '';
    competitorName = '';

    isJoining = false;
    isCreating = false;

    /**
     * @returns {boolean}
     */
    get isSubmitting() {
        return this.isCreating || this.isJoining;
    }

    /**
     * @returns {Promise<Competitor>}
     */
    joinLeague() {
        // if user is already in this league, just redirect to that league
        if (this.userLeagueIds.indexOf(this.leagueId) > -1) {
            this.showMessage('You\'re already a competitor in this league', 'is-info'); 
            this.redirectToLeague();
        } else if (this.validateLeagueId()) {
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
                        this.redirectToLeague();
                    },
                    (error) => {
                        this.showMessage(error.message);
                    }
                );
        }
    }

    redirectToLeague() {
        this.$router.push({name: 'standings', params: {leagueId: this.leagueId}});
    }

    /**
     * @returns {boolean}
     */
    validateLeagueId() {
        if (this.leagueId) {
            this.leagueId = this.leagueId.substring(0, 36);

            return uuidRegex.test(this.leagueId);
        }

        return false;
    }
}
