import React, { useRef, useEffect } from 'react';
import '../Styles/Sidebar.css';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

//iocns//
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Sidebar() {
    const { setSearchTerm, playlists, location, select, setSelect, newSidebar, updateSidebar } = useGlobalContext();
    const home = useRef(null);
    const search = useRef(null);
    const library = useRef(null);
    const add = useRef(null);
    const liked = useRef(null);
    useEffect(() => {
    }, [select]);
    useEffect(() => {
        updateSidebar();
    }, [updateSidebar, newSidebar]);
    return (<>
        <div className="sidebar__logo">
            <img className='logo'
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="logo"
            />
        </div>
        <div className="sidebar__nav_elements">
            <Link className='link' to={`/${location}`}>
                <div className={select !== 'home' ? "sidebar__nav_element  sidebar__home" : 'sidebar__nav_element_clicked'} id='home' ref={home}
                    onClick={() => { setSelect(home.current.id); }}>
                    <HomeIcon fontSize='large' className='sidebar_icon' />
                    <span>Home</span>
                </div>
            </Link>

            <Link className='link' to={`/search/${location}`}>
                <div className={select !== 'search' ? "sidebar__nav_element  sidebar__search" : 'sidebar__nav_element_clicked'} id='search' ref={search}
                    onClick={() => {
                        setSelect(search.current.id);
                        setSearchTerm('default search');
                    }}>
                    <SearchIcon fontSize='large' className='sidebar_icon' />
                    <span>Search</span>
                </div>
            </Link>
            <Link className='link' to={`/yourlibrary/${location}`}>
                <div className={select !== 'library' ? "sidebar__nav_element  sidebar__library" : 'sidebar__nav_element_clicked'} id='library' ref={library} onClick={() => setSelect(library.current.id)}>
                    <LibraryMusicIcon fontSize='large' className='sidebar_icon' />
                    <span>Your Library</span>
                </div>
            </Link>

            <div className="sidebar__playlist"><span>
                PLAYLISTS
                </span></div>
            <Link className='link' to={`/createplaylist/${location}`}>
                <div className={select !== 'add' ? "sidebar__nav_element  sidebar__add" : 'sidebar__nav_element_clicked'} id='add' ref={add} onClick={() => setSelect(add.current.id)}>
                    <AddBoxIcon fontSize='large' className='sidebar_icon' />
                    <span>Create Playlist</span>
                </div>
            </Link>

            <Link className='link' to={`/likedsongs/${location}`}>
                <div className={select !== 'liked' ? "sidebar__nav_element  sidebar__like" : 'sidebar__nav_element_clicked'} id='liked' ref={liked} onClick={() => setSelect(liked.current.id)}>
                    <FavoriteIcon fontSize='large' className='sidebar_icon' />
                    <span>Liked Songs</span>
                </div>
            </Link>

            <hr className='sidebar__dash'></hr>
            <div className="sidebar_playlists ">
                {playlists.map((item) => {
                    return (
                        <p key={item.id}>{item.name}</p>
                    );
                })}
            </div>
        </div></>
    );
}

export default Sidebar;
