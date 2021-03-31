import React from 'react';
import '../Styles/Artists.css';

function Artists({ artists }) {
    return (
        <div className="artists__row">
            {artists?.map((item) => {
                const { type, href, id, images, name } = item;
                return (
                    <div key={id} className="artist">
                        <img className='artist__banner' href={href} src={images[1]?.url || images[2]?.url || '../../unknown__user.png'} alt={name} />
                        <div className="artist__details">
                            <div className="artist__name">{name}</div>
                            <div className="artist__type">{type}</div>
                        </div>
                    </div>
                );
            })
            }
        </div>
    );
}

export default Artists;

