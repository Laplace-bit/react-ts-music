import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getSongUrl } from '../../../api/songRequest';
import { useAppSelector } from '../../../store/hooks';


const Player: React.FC = () => {
    const song = useAppSelector((state) => state.song.id);
    const [songUrl, setSongUrl] = useState("");

    const songPlay = async (song: number) => {
        getSongUrl(song).then((res) => res)
            .then((body) => {
                console.log(body)
                const currId = body.data.find(item => item.id === song);
                currId && setSongUrl(currId.url);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    useEffect(() => {
        songPlay(song)
    }, [song]);

    return (
        <div id="player" >
            <AudioPlayer
                className='react-player'
                autoPlay
                src={songUrl}
                onPlay={e => console.log("onPlay")}
            />
        </div>
    );
};

export default Player;