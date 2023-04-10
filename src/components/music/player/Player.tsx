import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getLyric, getSongUrl } from '@/api/songRequest';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import MusicFunc from '@/tools/musicFunc';
import { songChange, setLyric } from '@/store/features/song-slice';
import { type SongListState } from "@/store/features/types/songsType";
import useAsync from '@/hooks/useAsync';
import { Spin } from 'antd';


const Player: React.FC = () => {
    const dispatch = useAppDispatch();
    const songId = useAppSelector((state) => state.song.id);
    const songName = useAppSelector((state) => state.song.name);
    const [songUrl, setSongUrl] = useState("");



    // 请求处理hook
    const { sendHttp, isLoading, error } = useAsync()
    // 获取音乐url
    const songPlay = async (songId: number) => {
        try {
            sendHttp(getSongUrl(songId).then((res) => res)
                .then((body) => {
                    console.log(body)
                    const currId = body.data.find(item => item.id === songId);
                    currId && setSongUrl(currId.url);
                })
            )
        } catch (error) {
            console.error("catch error in songPlay :", error)
        }
    }
    // 获取音乐歌词
    const getLyricPlay = async (songId: number) => {
        sendHttp(getLyric(songId).then((res) => res)
            .then((body) => {
                console.log("getLyricPlay", body)
                dispatch(setLyric({ lyric: body?.lrc?.lyric }))
            })
        )
    }
    // 下一首
    const songList = useAppSelector((state) => state.songlist.list);
    const data = MusicFunc.uniqueObjectArray(songList, "id");
    const onNextSong = async () => {
        const nextSong = findAdjacentId(data, songId, "next");
        dispatch(songChange({ id: nextSong.id, name: nextSong.name, singer: nextSong.desc }))
    }
    // 上一首
    const onPrevSong = async () => {
        let prevSong = findAdjacentId(data, songId, "prev");
        dispatch(songChange({ id: prevSong.id, name: prevSong.name, singer: prevSong.desc }))
    }
    // 查找相邻id
    const findAdjacentId = (arr: any[], id: number, position: string): SongListState => {
        let res;
        const currentIndex = arr.findIndex((item) => item.id === id);
        if (position === "next") {
            res = arr.length > currentIndex ? arr[currentIndex + 1] : arr[0];
        } else {
            res = currentIndex > 1 ? arr[currentIndex - 1] : arr[arr.length - 1];
        }
        return res;
    }

    const lyric = useAppSelector((state) => state.song.lyric);
    const lyricTimeList = MusicFunc.lyricFormat(lyric);
    console.error("lyricTimeList", lyricTimeList)
    useEffect(() => {
        if (songId !== 0) {
            songPlay(songId);
            getLyricPlay(songId)
        }
    }, [songId]);

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
                        {isLoading ? <Spin /> : songName}
                    </div>
                }
                footer={
                    <div>
                        {lyricTimeList.map(item =>
                            <p key={item.time}>{item.value}</p>
                        )}
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