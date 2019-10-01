export default {
    leagueId: (state, leagueId) => state.leagueId = leagueId,
    competitors: (state, competitors = []) => state.competitors = competitors,
    name: (state, name) => state.name = name,
    icon: (state, icon) => state.icon = icon,
    isLoading: (state, loading = true) => state.isLoading = loading,
};
