import React from 'react';
import '../Styles/CreatePlaylist.css';
import { useGlobalContext } from '../context';

function CreatePlaylist() {
    const { spotify, setNewSidebar } = useGlobalContext();
    const [added, setAdded] = React.useState(false);
    const Name = React.useRef(null);
    const Description = React.useRef(null);
    const [playlistType, setPlaylistType] = React.useState(true);
    React.useEffect(() => {
        Name.current.focus();
        setAdded(false);
    }, []);
    const createPlaylist = () => {
        spotify.createPlaylist(Name.current.value, { 'description': Description.current.value, 'public': playlistType })
            .then(function (data) {
                setAdded(true);
                setNewSidebar(Name.current.value);

                setTimeout(() => {
                    Name.current.value = '';
                    Description.current.value = '';
                    setAdded(false);
                }, 3000);
                // console.log('Created playlist!');
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    };

    return (
        <>
            <div className="createPlaylist__form">
                <label className='createPlaylist__form__lable'>Name</label>
                <input className='createPlaylist__input' type="text"
                    ref={Name}
                    placeholder='New Playlist Name' />
                <label className='createPlaylist__form__lable' >Description</label>
                <textarea className='createPlaylist__input'
                    ref={Description}
                    placeholder='New Playlist Description' rows='4' />
                <div className="createPlaylist__form__lowerpart">
                    <button className='createPlaylist__form__btn'
                        onClick={() => setPlaylistType(!playlistType)}>
                        {playlistType ? 'Public' : 'Private'}
                    </button>
                    <button className='createPlaylist__form__btn'
                        onClick={() => createPlaylist()}
                    >Create</button>
                </div>
                {added && <div className='createPlaylist__success'>
                    {Name.current.value} Added
                </div>}
            </div>
        </>
    );
}

export default CreatePlaylist;
