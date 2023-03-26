/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import "@/components/music/list/musicList.less"
import { getNewSongs } from '@/api/songRequest';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { songChange } from '@/store/features/song-slice';
import { loadSongList } from '@/store/features/songlist-slice';
import MusicFunc from '@/tools/musicFunc';
import { type SongListState } from "@/store/features/types/songsType";

const MusicList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    let data = useAppSelector((state) => state.songlist.list);
    data = MusicFunc.uniqueObjectArray(data, "id");
    const dispatch = useAppDispatch();
    /**
     * 点击歌曲变更id
     */
    function handleSongChange(item: SongListState) {
        dispatch(songChange({ id: item.id, name: item.name, singer: "" }))
    }
    /**
     * 加载更多歌曲
     */
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        getNewSongs()
            .then((res) => res)
            .then((body) => {
                // 保存到redux
                dispatch(loadSongList(MusicFunc.listHandler(body.result, 'newSong')))
                console.log(">>>", body.result)
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div
            id="scrollableDiv"
            style={{
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 10}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.picUrl}
                            onClick={() => handleSongChange(item)}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picUrl} />}
                                title={item.name}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};

export default MusicList;