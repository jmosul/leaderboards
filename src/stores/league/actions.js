import LeaguesService from '../../services/LeaguesService';
import CompetitorsService from '../../services/CompetitorsService';

export default {
    handleRouteChange: async({ commit, dispatch }, { params }) => {
        commit('leagueId', params.leagueId);

        return await dispatch('updateLeague');
    },
    updateLeague: async({getters, dispatch, commit}) => {
        const leagueId = getters.leagueId;

        if(leagueId) {
            const promises = Promise.all([
                LeaguesService.show(getters.leaguePool, leagueId),
                CompetitorsService.leagueId(leagueId).index(),
            ]);

            return await promises.then(
                (results) => {
                    dispatch('updateFromModel', results[0]);
                    commit('competitors', results[1]);

                    return true;
                },
                (error) => {
                    throw error;
                }
            );
        }

        return false;

        // return dispatch('clearLeague');
    },
    clearLeague: async({ commit }) => {
        commit('leagueId');
        commit('competitors');
        commit('name');
        commit('icon');

        return true;
    },
    updateFromModel:({commit}, league) => {
        commit('name', league.name);
        commit('icon', league.icon);
        commit('leagueId', league.leagueId);
    },
};
