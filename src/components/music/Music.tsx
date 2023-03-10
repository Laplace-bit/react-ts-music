import React, { useEffect } from 'react';
import MusicList from './list/MusicList';
import SearchBar from './search/SearchBar';
import "./music.less"
import Player from './player/Player';


const Music: React.FC = () => {

    useEffect(() => {
        console.log("wellcome to music!");
    })

    return (
        <div
            className='container'
           >
            <div className='side-box'>
                <SearchBar></SearchBar>
                <MusicList></MusicList>
            </div>
            <div className='player-box'>
                <Player></Player>
            </div>

        </div>
    );
};

export default Music;
