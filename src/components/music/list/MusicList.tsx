import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./musicList.less"
import { getNewSongs } from '../../../api/songRequest';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { songChange } from '../../../store/features/song-slice';
import { loadSongList } from '../../../store/features/songlist-slice';


const MusicList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const data = useAppSelector((state) => state.songlist.list);

    const dispatch = useAppDispatch();
    /**
     * 点击歌曲变更id
     */
    function handleSongChange(id: number) {
        dispatch(songChange(id))
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
                dispatch(loadSongList(body.result))
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
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.picUrl}
                            onClick={() => handleSongChange(item.id)}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picUrl} />}
                                title={item.name}
                                description={item.song.album.company + "-" + item.song.album.subType}
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};

export default MusicList;