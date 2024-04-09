import React, { useEffect, useState, useCallback } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './player.less'
import { getLyric, getSongUrl } from '@/api/songRequest';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import MusicFunc from '@/tools/musicFunc';
import { songChange, setLyric } from '@/store/features/song-slice';
import { type SongListState } from "@/store/features/types/songsType";
import { Spin } from 'antd';
import { Lyric } from '@/components/UI';


const Player: React.FC = () => {
    const dispatch = useAppDispatch();
    const songId = useAppSelector((state) => state.song.id);
    const songName = useAppSelector((state) => state.song.name);
    const [songUrl, setSongUrl] = useState("");



    const [isLoading, setIsLoading] = useState(false)
    // 获取音乐url
    const songPlay = async (songId: number) => {
        try {
            setIsLoading(true)
            const res = await getSongUrl(songId)
            if (res && res.data && Array.isArray(res.data)) {
                const currId = res.data.find(item => item.id === songId);
                currId && setSongUrl(currId.url);
            }
        } catch (error) {
            console.error("catch error in songPlay :", error)
        } finally {
            setIsLoading(false)
        }
    }
    // 获取音乐歌词
    const getLyricPlay = useCallback(async (songId: number) => {
        setIsLoading(true)
        const res = await getLyric(songId)
        dispatch(setLyric({ lyric: res?.lrc?.lyric }))
        setIsLoading(false)
    }, [dispatch])
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
    // 歌曲播放当前时间
    // let currentTime: number = 0;
    let [currentTime, setCurrentTime] = useState<number>(0)
    let [currentTimeStamp, setCurrentTimeStamp] = useState<number>(0)
    interface timeupdate {
        timeStamp: number,
    }
    useEffect(() => {
        setCurrentTimeStamp(0);

    }, [songUrl])

    const listenTimeUpdate = useCallback(
        (event: timeupdate) => {
            const second = event.timeStamp.valueOf() / 1000;
            const dur: number = (second - currentTimeStamp.valueOf());
            if (currentTimeStamp !== 0) {
                setCurrentTime(dur);
                return
            }
            setCurrentTimeStamp(second);

        }, [currentTimeStamp]
    )

    const lyric = useAppSelector((state) => state.song.lyric);
    const lyricTimeList = MusicFunc.lyricFormat(lyric);
    useEffect(() => {
        if (songId !== 0) {
            songPlay(songId);
            getLyricPlay(songId)
        }
    }, [getLyricPlay, songId]);

    return (
        <div id="player" style={{ height: '100%', overflow: 'hidden' }} >
            <AudioPlayer
                className='react-player'
                muted={false}//温和
                autoPlay
                onListen={listenTimeUpdate}
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
                        <Lyric lyricList={lyricTimeList} currentTime={currentTime} lyricChange={Boolean(currentTimeStamp)}></Lyric>
                        {/* {lyricTimeList.map(item =>
                            <p key={item.time}>{item.value}</p>
                        )} */}
                    </div>
                }
                style={{
                    backgroundColor: 'black',
                    height: "100%"
                }}
            />
        </div>
    );
};

export default React.memo(Player);