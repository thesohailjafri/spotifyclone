import React from 'react';
import '../Styles/YourLibrary.css';
import Playlists from "../Components/Playlists";
import Album from "../Components/Album";
import Artists from "../Components/Artists";

import { useGlobalContext } from '../context';

function YourLibrary() {
    const { playlists, followedArtists, mySavedAlbums } = useGlobalContext();
    console.log(playlists, mySavedAlbums, followedArtists);
    return (
        <div>
            <div className="liked__songs__playlist">
                <h1>Liked Songs</h1>
            </div>
            <div className='your__playlist'>
                <Playlists playlists={playlists} title='Your Playlists' />
            </div>
            <h2 className='title'>Followed Albums</h2>
            <div className="followed_albums">
                {
                    mySavedAlbums?.map((item) => {
                        return (
                            <Album key={item.album.id} album={item.album} />
                        );
                    })
                }
            </div>
            <h2 className='title'>Followed Artist</h2>
            {
                <Artists artists={followedArtists} />
            }



        </div>
    );
}

export default YourLibrary;
