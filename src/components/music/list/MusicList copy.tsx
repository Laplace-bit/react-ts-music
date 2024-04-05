/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List as ListUI, Skeleton, Spin } from 'antd';
// import InfiniteScroll from 'react-infinite-scroll-component';
import "@/components/music/list/musicList.less"
import { getNewSongs, searchSong } from '@/api/songRequest';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { songChange } from '@/store/features/song-slice';
import { loadSongList } from '@/store/features/songlist-slice';
import MusicFunc from '@/tools/musicFunc';
import { type SongListState } from "@/store/features/types/songsType";
import useAsync from '@/hooks/useAsync';
import { Loading } from '@/components/UI';

import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once


const MusicList: React.FC = () => {
    // 列表数据
    let data = useAppSelector((state) => state.songlist.list);
    // 列表数量
    const songCount = useAppSelector((state) => state.songlist.songCount);
    // 搜索参数
    const searchParams = useAppSelector((state) => state.songlist.searchParams);
    // 列表类型
    const listType = useAppSelector((state) => state.songlist.listType);
    // 去重
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
     *
     */
    const { sendHttp, isLoading, error } = useAsync()

    const loadMoreData = async () => {
        switch (listType) {
            case "newSong":
                sendHttp(
                    getNewSongs()
                        .then((body) => {
                            if (body) {
                                // 保存到redux
                                dispatch(loadSongList({ list: MusicFunc.listHandler(body.result, 'newSong'), listType: "newSong" }))
                            }
                        })
                )
                break;
            case "searchSong":
                const { keywords = "", offset = 0 } = searchParams || {};
                const newParam = { keywords, limit: 30, offset: offset + 1 }
                const { result: { songs } } = await sendHttp(searchSong(newParam.keywords, newParam.limit, newParam.offset));
                let allSongs = [...data, ...songs]
                dispatch(
                    loadSongList({
                        list: MusicFunc.listHandler(allSongs, 'searchSong'),
                        listType: "searchSong",
                        songCount,
                        searchParams: newParam
                    })
                )
                break;
            default:
                break;
        }

    };

    useEffect(() => {
        loadMoreData();
    }, []);


    let remoteRowCount: any;


    function isRowLoaded({ index }: any) {
        return !!data[index];
    }


    function rowRenderer({ key, index, style }: any) {
        return (
            // <div
            //     key={key}
            //     style={style}
            // >
            <ListUI
                dataSource={data}
                renderItem={(item) => (
                    <ListUI.Item key={item.picUrl}
                        onClick={() => handleSongChange(item)}>
                        <ListUI.Item.Meta
                            avatar={<Avatar src={item.picUrl} />}
                            title={item.name}
                            description={item.desc}
                        />
                    </ListUI.Item>
                )}
            />
            // </div>
        )
    }

    return (
        <div
            id="scrollableDiv"
            style={{
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            {/* <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < (songCount ? songCount : 10)}
                loader={<Loading></Loading>}
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
            </InfiniteScroll> */}

            <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreData}
                rowCount={remoteRowCount}
            >
                {({ onRowsRendered, registerChild }) => (
                    <List
                        height={200}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        rowCount={remoteRowCount}
                        rowHeight={20}
                        rowRenderer={rowRenderer}
                        width={300}
                    />
                )}
            </InfiniteLoader>

        </div>
    );
};

export default MusicList;