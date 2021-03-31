import React from 'react';
import '../Styles/Album.css';

function Album({ album }) {
    const { href, id, images, name, artists } = album;
    let artistsgrp = '';
    artists.map((item) => artistsgrp += item.name + ', ');
    artistsgrp = artistsgrp.slice(0, -2);
    return (
        <div key={id} className='album'>
            <img className='album__banner' href={href} src={images[1]?.url || images[0]?.url || '../../album__banner.png'} alt={'images'} />
            <div className="album__details">
                <div className="album__name">
                    {name}
                </div>
                <div className="album__artist">
                    {artistsgrp}
                </div>
            </div>
        </div>
    );
}

export default Album;
