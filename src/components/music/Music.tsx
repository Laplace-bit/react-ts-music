import React, { useEffect } from 'react';
import MusicList from './list/MusicList';
import SearchBar from './search/SearchBar';
import "./music.scss"

const Music: React.FC = () => {

    useEffect(() => {
        console.log("wellcome to music!");
    })

    return (
        <div style={{
            height: '100%'
        }}>
            <div className='side-box'>
                <SearchBar></SearchBar>
                <MusicList></MusicList>

            </div>
            listen some music
        </div>
    );
};

export default Music;
