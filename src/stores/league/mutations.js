export default {
    leagueId: (state, leagueId) => {
        state.leagueId = leagueId;

        console.log( 'mut', leagueId );
    },
    competitors: (state, competitors = []) => state.competitors = competitors,
    name: (state, name) => state.name = name,
    icon: (state, icon) => state.icon = icon,
};
