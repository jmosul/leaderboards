export default {
    id: (state) => state.id,
    username: (state) => state.username,
    leagues: (state) =>  state.leagues,
    leagueIds: (state) => state.leagues.map((league) => league.leagueId),
    leaguePool: (state) => state.leaguePool,
    loadingLeagues: (state) => state.loadingLeagues,
};
