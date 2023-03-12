import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./musicList.less"
import { getNewSongs } from '../../../api/songRequest';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { songChange } from '../../../store/features/song-slice';


interface DataType {
    alg: string;
    canDislike: boolean;
    copywriter: any;
    id: number;
    name: string;
    picUrl: string;
    song: {
        subType: string;
        name: string;
        id: number;
        position: number;
        alias: Array<any>;
        status: 0;
        album: any;
        audition: null
        bMusic: any;
        commentThreadId: "R_SO_4_2026211286"
        copyFrom: ""
        copyright: 1
        copyrightId: 7001
        crbt: null
        dayPlays: 0
        disc: "01"
        duration: 180688
        exclusive: false
        fee: 8
        ftype: 0
        hearTime: 0
        hrMusic: null
        mark: 0
        mp3Url: null
        mvid: 0

    }
    trackNumberUpdateTime: null;
    type: number;
}

const MusicList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

 
    const dispatch = useAppDispatch();

    function handleSongChange(id:number) {
        dispatch(songChange(id))
    }

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        getNewSongs()
            .then((res) => res)
            .then((body) => {
                console.log(">>>", body.result)
                setData([...data, ...body.result]);
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
                            onClick={()=>handleSongChange(item.id)}>
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