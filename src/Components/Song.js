import React from 'react';

function Song({ image, name, href, artists }) {
    let artistsgrp = '';
    artists.map((item) => artistsgrp += item.name + ', ');
    artistsgrp = artistsgrp.slice(0, -2);
    return (<>
        <div className="song__block">
            <img className='song__image' src={image} alt={name} />
            <div className="song__details" href={href}>
                <div className="song__name">
                    {name}
                </div>
                <div className="song__artists">
                    {artistsgrp}
                </div>
            </div>
        </div>
    </>
    );
}

export default Song;
