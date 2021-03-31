import React from 'react';
import Song from "../Components/Song";
import { useGlobalContext } from '../context';

function LikedSongs() {
    const { mySavedTracks } = useGlobalContext();
    React.useEffect(() => {
    }, [mySavedTracks]);

    return (
        <>
            <h2 className='title'>
                Your Liked Song
            </h2>
            {mySavedTracks.map((item) => {
                const { id, name, album, href, artists } = item.track;
                return (
                    <div key={id} className="search__song">
                        <Song name={name} href={href} image={album.images[2].url} artists={artists} />
                    </div>
                );
            }
            )}
        </>
    );
}

export default LikedSongs;
