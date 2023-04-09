import { useAppSelector } from '@/store/hooks';
import MusicFunc from '@/tools/musicFunc';
import React, { useEffect } from 'react';


const Lyric: React.FC = () => {

    const lyric = useAppSelector((state) => state.song.lyric);
    const lyricTimeList = MusicFunc.lyricFormat(lyric);


    useEffect(() => {
        console.log("wellcome to Lyric!");
    })

    return (
        <div
            className='lyric-container'
        >
            {lyricTimeList.map(item =>
                <p key={item.time}>{item.value}</p>
            )}
        </div>
    );
};

export default Lyric;
