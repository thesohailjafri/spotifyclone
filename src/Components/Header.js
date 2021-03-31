import React from 'react';
import { useGlobalContext } from '../context';
import '../Styles/Header.css';
//icons//
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SearchIcon from '@material-ui/icons/Search';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
function Header() {
    const { user, select, setSearchTerm } = useGlobalContext();
    const searchValue = React.useRef('');
    const setSearchTermHandle = () => {
        setSearchTerm(searchValue.current.value);
        searchValue.current.focus();
    };

    return (
        <div className='header'>
            <div className="header__navigation">
                <div className="header__arrow">
                    <NavigateBeforeIcon fontSize='large' />
                </div>
                <div className="header__arrow">
                    <NavigateNextIcon fontSize='large' />
                </div>
            </div>
            {select === 'search' &&
                <div className="search__form" >
                    <SearchIcon />
                    <input className='search__input' placeholder="Search for Artists, Songs, or Podcasts" type='text' ref={searchValue} onChange={setSearchTermHandle} />
                </div>}
            <div className="header__user">
                {user?.body?.images[0]?.url ?
                    <img className='header__userpicture' src={user?.body?.images[0]?.url} alt="name : " />
                    :
                    <AccountCircleIcon fontSize='large' />
                }
                <p className='header__username'>{user?.body?.display_name}</p>
            </div>
        </div>
    );
}

export default Header;
