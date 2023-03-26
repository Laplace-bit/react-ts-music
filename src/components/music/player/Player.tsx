import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getSongUrl } from '@/api/songRequest';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import MusicFunc from '@/tools/musicFunc';
import { songChange } from '@/store/features/song-slice';
import { type SongListState } from "@/store/features/types/songsType";



const Player: React.FC = () => {
    const dispatch = useAppDispatch();
    const song = useAppSelector((state) => state.song.id);
    const songName = useAppSelector((state) => state.song.name);
    const [songUrl, setSongUrl] = useState("");

    // 获取音乐url
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
    // 下一首
    const songList = useAppSelector((state) => state.songlist.list);
    const data = MusicFunc.uniqueObjectArray(songList, "id");
    const onNextSong = async () => {
        const nextSong = findAdjacentId(data, song, "next");
        dispatch(songChange({ id: nextSong.id, name: nextSong.name, singer: nextSong.desc }))
    }
    // 上一首
    const onPrevSong = async () => {
        let prevSong = findAdjacentId(data, song, "prev");
        dispatch(songChange({ id: prevSong.id, name: prevSong.name, singer: prevSong.desc }))
    }
    // 查找相邻id
    const findAdjacentId = (arr: any[], id: number, position: string): SongListState => {
        let res;
        const currentIndex = arr.findIndex((item) => item.id === id);
        if (position === "next") {
            if (arr.length > currentIndex) {
                res = arr[currentIndex + 1]
            } else {
                res = arr[0]
            }
        } else {
            if (currentIndex > 1) {
                res = arr[currentIndex - 1]
            } else {
                res = arr[arr.length - 1]
            }
        }
        return res;
    }



    useEffect(() => {
        songPlay(song)
    }, [song]);

    return (
        <div id="player" >
            <AudioPlayer
                className='react-player'
                muted={false}//温和
                autoPlay
                src={songUrl}
                onPlay={e => console.log("onPlay")}
                layout="horizontal-reverse"
                onClickNext={onNextSong}
                onClickPrevious={onPrevSong}
                onEnded={onNextSong}
                showJumpControls={false}
                showSkipControls={true}//切歌按钮
                header={
                    <div style={{ textAlign: "center" }}>
                        {songName}
                    </div>
                }
                style={{
                    backgroundColor: 'black'
                }}
            />
        </div>
    );
};

export default Player;