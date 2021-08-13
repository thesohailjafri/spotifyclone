import React, { createContext, useReducer, useContext, useEffect, useState, useCallback, } from 'react'
import reducer from './reducer'
import SpotifyWebApi from 'spotify-web-api-node'

export const context = createContext()

const spotify = new SpotifyWebApi()


export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [select, setSelect] = useState('home')
    const [newSidebar, setNewSidebar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchLoading, setSearchLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('default search')
    const location = window.location.hash
    const [searchBar, setSearchBar] = useState('')
    const limitCount = Math.floor(window.innerWidth / 220)
    const limitCountForCategory = limitCount * 6
    // console.log(limitCountForCategory);
    let __categories = []


    const getTokenFromResponse = () => {
        return window.location.hash
            .substring(1)
            .split("&")
            .reduce((initial, item) => {
                var parts = item.split("=")
                initial[parts[0]] = decodeURIComponent(parts[1])
                return initial
            }, {})
    }

    useEffect(() => {
        const fetchData = () => {
            try {
                let hash = getTokenFromResponse()
                let _token = hash.access_token
                // console.log(_token);
                setLoading(true)
                if (_token) {
                    //set access token spotify authetication + user details
                    spotify.setAccessToken(_token)
                    dispatch({
                        type: 'SET_TOKEN',
                        token: _token,
                    })
                    //gets users details like p.pic name etc
                    spotify.getMe()
                        .then((user) => {
                            dispatch({
                                type: 'SET_USER',
                                user,
                            })
                        }, function (err) {
                            console.log('Something went wrong!', err)
                        })
                        .then(
                            //gets users palylists
                            spotify.getUserPlaylists().then((playlists) => {
                                dispatch({
                                    type: 'SET_PLAYLISTS',
                                    playlists: playlists.body.items,
                                })
                            }, function (err) {
                                console.log('Something went wrong!', err)
                            }))
                        .then(
                            spotify.getMySavedAlbums({ offset: 0 })
                                .then(mySavedAlbums => {
                                    dispatch({
                                        type: 'SET_MY_SAVED_ALBUMS',
                                        mySavedAlbums: mySavedAlbums.body.items,
                                    })
                                    // console.log(mySavedAlbums.body.items);
                                }, function (err) {
                                    console.log('Something went wrong!', err)
                                }))
                        .then(
                            spotify.getFollowedArtists({ limit: 15 })
                                .then(followedArtists => {
                                    dispatch({
                                        type: 'SET_FOLLOWED_ARTISTS',
                                        followedArtists: followedArtists.body.artists.items,
                                    })
                                    // console.log('This user is following ', followedArtists.body.artists.total, ' artists!');
                                }, function (err) {
                                    console.log('Something went wrong!', err)
                                }))
                        .then(
                            //  Retrieve featured playlists
                            spotify.getFeaturedPlaylists({ limit: limitCount, offset: 1, country: 'IN', locale: 'sv_IN', timestamp: '2014-10-23T09:00:00' })
                                .then(featuredPlaylists => {
                                    // console.log(featuredPlaylists.body.playlists.items);
                                    dispatch({
                                        type: 'SET_FEATURED_PLAYLISTS',
                                        featuredPlaylists: featuredPlaylists.body.playlists.items,
                                    })
                                }, function (err) {
                                    console.log('Something went wrong!', err)
                                }))
                        .then(
                            // Retrieve new releases
                            spotify.getNewReleases({ limit: limitCount, offset: 0, country: 'IN' })
                                .then(newReleasePlaylists => {
                                    // console.log(newReleasePlaylists.body.albums.items);
                                    dispatch({
                                        type: 'SET_NEW_RELEASE_PLAYLISTS',
                                        newReleasePlaylists: newReleasePlaylists.body.albums.items,
                                    })
                                }, function (err) {
                                    console.log('Something went wrong!', err)
                                }))
                        .then(
                            spotify.getRecommendations({
                                limit: limitCount,
                                min_energy: 0.4,
                                seed_artists: ['7bXgB6jMjp9ATFy66eO08Z', '06HL4z0CvFAxyc27GXpf02'],
                                min_popularity: 80
                            })
                                .then((recommendations) => {
                                    dispatch({
                                        type: 'SET_RECOMMENDATIONS',
                                        recommendations: recommendations.body.tracks,
                                    })
                                }, function (err) {
                                    console.log("Something went wrong!", err)
                                })
                        ).then(
                            // Get tracks in the signed in user's Your Music library
                            spotify.getMySavedTracks({ offset: 0 })
                                .then(mySavedTracks => {
                                    dispatch({
                                        type: 'SET_MY_SAVED_TRACKS',
                                        mySavedTracks: mySavedTracks.body.items,
                                    })
                                    // console.log(mySavedTracks.body.items);
                                }, function (err) {
                                    console.log('Something went wrong!', err)
                                })
                        )
                        .then(
                            // Get a List of Categories
                            spotify.getCategories({
                                limit: limitCountForCategory, offset: 0, country: 'IN', locale: 'sv_IN'
                            }).then(categories => {
                                // console.log(categories);
                                dispatch({
                                    type: 'SET_CATEGORIES',
                                    categories: categories.body.categories.items,
                                })
                                // console.log('cc', categories.body.categories.items);
                                categories.body.categories.items.slice(0, 5).map(category => {
                                    spotify.getPlaylistsForCategory(category.id, { country: 'IN', limit: limitCount, offset: 0 }).then(playlists => {
                                        // console.log(category.name, playlists.body.playlists.items);
                                        __categories.push({ id: category.id, name: category.name, playlists: playlists.body.playlists.items })
                                    })
                                    return ((category))
                                })
                                dispatch({
                                    type: 'SET_CATEGORIES_WITH_PLAYLISTS',
                                    categories_with_playlists: __categories,
                                }, function (err) {
                                    console.log('Something went wrong!', err)
                                })
                            }, function (err) {
                                console.log('Something went wrong!', err)
                            }))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        let to
        to = setTimeout(() => {
            setLoading(false)
        }, 3000)
        return () => {
            clearTimeout(to)
        }
    }, [])

    const fetchDataForSearchTerm = useCallback(() => {
        // console.log(searchTerm);
        try {

            if (searchTerm !== '') {
                spotify.searchTracks(searchTerm)
                    .then(searchTracks => {
                        dispatch({
                            type: 'SET_SEARCH_TRACKS',
                            searchTracks: searchTracks.body.tracks.items,
                        })
                    }, function (err) {
                        console.error(err)
                    }).then
                    (spotify.searchArtists(searchTerm)
                        .then(searchArtists => {
                            dispatch({
                                type: 'SET_SEARCH_ARTISTS',
                                searchArtists: searchArtists.body.artists.items,
                            })
                        }, function (err) {
                            console.error(err)
                        })).then
                    (spotify.searchPlaylists(searchTerm)
                        .then(searchPlaylists => {
                            dispatch({
                                type: 'SET_SEARCH_PLAYLISTS',
                                searchPlaylists: searchPlaylists.body.playlists.items,
                            })
                        }, function (err) {
                            console.log('Something went wrong!', err)
                        }))
            }
        } catch (error) {
            console.log(error)
            console.log('nothing found')

        }
    }, [searchTerm])
    useEffect(() => {
        fetchDataForSearchTerm()
        let to
        to = setTimeout(() => {
            setSearchLoading(false)
        }, 1000)
        return () => {
            clearTimeout(to)
        }
    }, [fetchDataForSearchTerm, searchTerm])

    const updateSidebar = useCallback(() => {
        if (newSidebar !== null) {
            spotify.getUserPlaylists().then((playlists) => {
                dispatch({
                    type: 'SET_PLAYLISTS',
                    playlists: playlists.body.items,
                })
            }, function (err) {
                console.log('Something went wrong!', err)
            })
        }
    }, [newSidebar])

    return (<context.Provider
        value={{
            ...state,
            accessUrl,
            loading,
            setLoading,
            setSearchTerm,
            searchTerm,
            searchLoading,
            limitCount,
            location,
            searchBar,
            setSearchBar,
            select,
            setSelect,
            spotify,
            newSidebar,
            setNewSidebar,
            updateSidebar,
        }
        }>
        {children}
    </context.Provider >)
}
export const useGlobalContext = () => {
    return useContext(context)
}
const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    discover_weekly: null,
    top_artists: null,
    playing: false,
    item: null,
}
export const authEndpoint = "https://accounts.spotify.com/authorize"
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "cff76213089a4e228206c8bf120d67cb"
const redirectUri = "http://localhost:3000/"
// const redirectUri = "https://f1ex-spotify.web.app/";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "user-library-read",
    "ugc-image-upload",
    "user-follow-read",
]
export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`


