import LeaguesService from '../../services/LeaguesService';
import CompetitorsService from '../../services/CompetitorsService';

export default {
    handleRouteChange: async({commit, dispatch, getters}, {params}) => {
        commit('leagueId', params.leagueId);

        return dispatch('updateLeague');
    },
    updateLeague: async({getters, dispatch, commit}) => {
        const leagueId = getters.leagueId;

        commit('isLoading');

        if (leagueId) {
            const promises = Promise.all([
                LeaguesService.show(getters.leaguePool, leagueId),
                CompetitorsService.leagueId(leagueId).index(),
            ]);

            return promises.then(
                (results) => {
                    dispatch('updateFromModel', results[0]);
                    commit('competitors', results[1]);

                    commit('isLoading', false);

                    return true;
                },
                (error) => {
                    commit('isLoading', false);

                    throw error;
                }
            );
        }

        return dispatch('clearLeague');
    },
    clearLeague: async({commit}) => {
        commit('leagueId');
        commit('competitors');
        commit('name');
        commit('icon');

        return true;
    },
    updateFromModel: ({commit}, league) => {
        commit('name', league.name);
        commit('icon', league.icon);
        commit('leagueId', league.leagueId);
    },
    isMember:({rootState, getters}) => {
        return rootState.user.leagueIds.indexOf(getters.leagueId) > -1;
    },
};
