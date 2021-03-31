import React from 'react';
import Loading from "../Components/Loading";
import Song from "../Components/Song";
import Playlists from "../Components/Playlists";
import Artists from "../Components/Artists";
import DefaultSearchResult from "../Components/DefaultSearchResult";

import { useGlobalContext } from '../context';
import SentimentDissatisfiedSharpIcon from '@material-ui/icons/SentimentDissatisfiedSharp';
function SearchForm() {
    const { limitCount, searchTerm, searchTracks, searchArtists, searchPlaylists, searchLoading } = useGlobalContext();
    if (searchTerm === '' || searchTerm === 'default search') {
        return <DefaultSearchResult />;
    }
    if (searchLoading) {
        return <div><Loading /></div>;
    }
    return (
        <>
            {(searchTracks.length === 0 && searchPlaylists.length === 0 && searchArtists.length === 0) &&
                <div className="no__match__found">
                    <h2 className='title'>
                        no match found
                    
                    </h2>
                    <SentimentDissatisfiedSharpIcon fontSize='large' />
                </div>
            }
            {searchTracks.length > 0 &&
                <div className="search__songs">

                    <h2 className='title'>Songs</h2>
                    {searchTracks.slice(0, 4).map((item) => {
                        const { name, id, href, album, artists } = item;
                        return (
                            <div key={id} className="search__song">
                                <Song name={name} href={href} image={album.images[2].url} artists={artists} />
                            </div>
                        );
                    })}
                </div>
            }
            {
                searchPlaylists.length > 0 &&
                <div className="search__playlists">
                    <Playlists playlists={searchPlaylists.slice(0, limitCount)} title='Playlists' />
                </div>
            }
            {
                searchArtists.length > 0 &&
                <div className="search__artists">
                    <h2 className='title'>Artists</h2>
                    <Artists artists={searchArtists.slice(0, limitCount)} />
                </div>
            }
        </>
    );
}

export default SearchForm;
