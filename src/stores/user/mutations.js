export default {
    id: (state, id) => state.id = id,
    username: (state, username) => state.username = username,
    leagues: (state, leagues) => state.leagues = leagues || [],
    loadingLeagues: (state, loading) => state.loadingLeagues = !!loading,
};
