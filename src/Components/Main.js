import React from 'react';
import '../Styles/Main.css';
//components//
import Playlists from "./Playlists";
import Loading from "./Loading";

import { useGlobalContext } from '../context';

function Main() {
    const { categories, featuredPlaylists, newReleasePlaylists, loading, } = useGlobalContext();
    // console.log(categories, loading);
    if (loading) {
        return <div className="body body__loading"><Loading /></div>;
    }
    return (
        <>
            <div className="body">
                {/* {loading && <Loading />} */}
                <div className="main">
                    <>
                        <div className="main__featured__playlists">
                            <Playlists playlists={featuredPlaylists} title="Editor's Choice" />
                        </div>
                        <div className="main__newRelease__playlists">
                            <Playlists playlists={newReleasePlaylists} title='New Releases' />
                        </div>

                        {categories.map((item) => {
                            const { id, name, playlists } = item;
                            return (
                                <div key={id} className={`main__${id}__playlists`}>
                                    <Playlists playlists={playlists} title={name} />
                                </div>
                            );
                        })}
                    </>

                </div>

            </div>
        </>
    );
}

export default Main;
