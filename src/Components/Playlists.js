import React from 'react';
import '../Styles/Playlists.css';

function Playlists({ playlists, title }) {
    return (
        <div className='playlists'>
            <h2 className='title'>
                {title}
            </h2>
            <div className="playlists__row">
                {playlists?.map((item) => {
                    const { href, id, images, name, description, album, artists } = item;
                    let artistsgrp = '';
                    description === undefined && artists.map((item) => artistsgrp += item.name + ', ');
                    artistsgrp = artistsgrp.slice(0, -2);
                    // console.log(artistsgrp);
                    return (
                        <div key={id} className="playlist">
                            {images ?
                                <img className='playlist__banner' href={href} src={images[1]?.url || images[0]?.url || '../../playlist__banner.png'} alt={'images'} />
                                :
                                <img className='playlist__banner' href={href} src={album.images[1]?.url || album.images[0]?.url || '%PUBLIC_URL%/../playlist__banner.png'} alt={'album'} />
                            }
                            <div className="playlist__details">
                                <div className="playlist__name">
                                    {name}
                                </div>
                                <div className="playlist__description">
                                    {description ?
                                        (description.length > 50 ? description.slice(0, 50) + '...' : description)
                                        : artistsgrp}
                                </div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </div>
    );
}

export default Playlists;
