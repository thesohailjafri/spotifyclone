const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            };
        case 'SET_MY_SAVED_TRACKS':
            return {
                ...state,
                mySavedTracks: action.mySavedTracks
            };
        case 'SET_MY_SAVED_ALBUMS':
            return {
                ...state,
                mySavedAlbums: action.mySavedAlbums
            };
        case 'SET_FOLLOWED_ARTISTS':
            return {
                ...state,
                followedArtists: action.followedArtists
            };
        case 'SET_FEATURED_PLAYLISTS':
            return {
                ...state,
                featuredPlaylists: action.featuredPlaylists
            };
        case 'SET_NEW_RELEASE_PLAYLISTS':
            return {
                ...state,
                newReleasePlaylists: action.newReleasePlaylists
            };
        case 'SET_RECOMMENDATIONS':
            return {
                ...state,
                recommendations: action.recommendations
            };
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.categories
            };
        case 'SET_CATEGORIES_WITH_PLAYLISTS':
            return {
                ...state,
                categories_with_playlists: action.categories_with_playlists
            };
        case 'SET_SEARCH_TRACKS':
            return {
                ...state,
                searchTracks: action.searchTracks
            };

        case 'SET_SEARCH_ARTISTS':
            return {
                ...state,
                searchArtists: action.searchArtists
            };
        case 'SET_SEARCH_PLAYLISTS':
            return {
                ...state,
                searchPlaylists: action.searchPlaylists
            };

        default:
            return { ...state };
    }
};
export default reducer;