import React from 'react';
import '../Styles/Home.css';
//component
import Playlists from "../Components/Playlists";

import { useGlobalContext } from '../context';

function Home() {

    const { categories_with_playlists, featuredPlaylists, newReleasePlaylists, recommendations } = useGlobalContext();
    // console.log(recommendations);

    return (
        <>
            <div className="main__featured__playlists">
                <Playlists playlists={featuredPlaylists} title="Editor's Choice" />
            </div>

            <div className="main__recommendations">
                <Playlists playlists={recommendations} title='Recommendations' />
            </div>

            <div className="main__newRelease__playlists">
                <Playlists playlists={newReleasePlaylists} title='New Releases' />
            </div>

            {categories_with_playlists?.map((item) => {
                const { id, name, playlists } = item;
                return (
                    <div key={id} className={`main__${id}__playlists`}>
                        <Playlists playlists={playlists} title={name} />
                    </div>
                );
            })}
        </>
    );
}

export default Home;


