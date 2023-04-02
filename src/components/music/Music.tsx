import React, { useEffect } from 'react';
import MusicList from '@/components/music/list/MusicList';
import SearchBar from '@/components/music/search/SearchBar';
import "@/components/music/music.less"
import Player from '@/components/music/player/Player';

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
