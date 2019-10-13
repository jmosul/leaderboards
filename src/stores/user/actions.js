import LeaguesService from '../../services/LeaguesService';

export default {
    updateLeagues: async({getters, commit}) => {
        commit('loadingLeagues', true);

        return LeaguesService.index({leaguePool: getters.leaguePool})
            .then((leagues) => {
                commit('leagues', leagues);
                commit('loadingLeagues', false);
            })
            .catch((error) => {
                commit('loadingLeagues', false);

                throw {
                    message: 'failed to load user leagues',
                    error,
                };
            });
    },
};
