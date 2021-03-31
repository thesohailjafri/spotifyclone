import React from 'react';
import '../Styles/Footer.css';
//temp//
import DashboardIcon from '@material-ui/icons/Dashboard';
//center//
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
//left//
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import DevicesIcon from '@material-ui/icons/Devices';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

function Footer() {
    const [value, setValue] = React.useState(30);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className='footer'>
            <div className="footer__left">
                <div className="footer__left__songimg">
                    <DashboardIcon style={{ fontSize: 60 }} className='footer__icons' />
                </div>
                <div className="footer__left__song">
                    <span className='songname'>Random</span>
                    <span className='songdetails'>blah blah</span>
                </div>
            </div>
            <div className="footer__center">
                <ShuffleIcon className='footer__icons' />
                <SkipPreviousIcon className='footer__icons' />
                <PlayCircleFilledIcon style={{ fontSize: 50 }} className='footer__icons' />
                <SkipNextIcon className='footer__icons' />
                <RepeatIcon className='footer__icons' />
            </div>
            <div className="footer__right">
                <PlaylistPlayIcon className='footer__icons' />
                <DevicesIcon className='footer__icons footer_devicesIcon' />
                <div className="footer__volume">
                    <VolumeDown className='footer__icons' />
                    <Slider className='footer__icons' style={{ color: 'green', width: 100 }} value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                    <VolumeUp className='footer__icons' />
                </div>
            </div>
        </div>
    );
}

export default Footer;
