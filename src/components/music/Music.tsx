import React, { useEffect } from 'react';
import MusicList from './list/MusicList';

const Music: React.FC = () => {

    useEffect(() => {
        console.log("wellcome to music!");
    })

    return (
        <div>
            <MusicList></MusicList>
            listen some music
        </div>
    );
};

export default Music;
