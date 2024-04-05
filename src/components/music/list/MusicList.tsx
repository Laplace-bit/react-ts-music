import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, List as ListUI } from 'antd';
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
    // 列表数据 // 列表数量 // 搜索参数 // 列表类型
    const { list: data, songCount, searchParams, listType } = useAppSelector((state) => state.songlist);
    // 去重
    // data = MusicFunc.uniqueObjectArray(data, "id");

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
    const [listLimit] = useState(30)
    const [loading, setLoading] = useState(false)
    const loadMoreData = async () => {
        setLoading(true)
        switch (listType) {
            case "searchSong":
                const { keywords = "", offset = 0 } = searchParams || {};
                const newParam = { keywords, limit: listLimit, offset: offset + 1 }
                const { result: { songs } } = await searchSong(newParam.keywords, newParam.limit, newParam.offset)
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
        setLoading(false)
    };
    useEffect(() => {
        const initNewSongs = async () => {
            const response = await getNewSongs()
            if (response) {
                dispatch(loadSongList({ list: MusicFunc.listHandler(response.result, 'newSong'), listType: "newSong" }))
            }
        }
        initNewSongs()
    }, []);

    //
    interface rowIndex {
        startIndex: number,
        stopIndex: number
    }
    const loadMoreRows = async ({ startIndex, stopIndex }: rowIndex) => {
        console.log("isLoading=>", loading)
        // 判断结束的id是否存在
        if (!data[stopIndex] && listType === 'searchSong' && !loading) {
            await loadMoreData()
        }
    }

    // 列表数据
    let remoteRowCount: number = useAppSelector((state) => state.songlist.songCount) || 10;


    function isRowLoaded({ index }: any) {
        return !!data[index];
    }
    // 行渲染
    const rowRendererCache = useCallback(rowRenderer, [data])
    function rowRenderer({ key, index, style }: any) {
        const item = data[index]
        return (
            !item ? "" :
                <ListUI.Item key={key}
                    style={{ ...style, display: 'flex', alignItems: 'center' }}
                    onClick={() => handleSongChange(item)}>
                    <ListUI.Item.Meta
                        avatar={<Avatar src={item.picUrl} />}
                        title={item.name}
                        description={item.desc}
                    />
                </ListUI.Item>
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
        >{
                !!data[0] ?
                    <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={loadMoreRows}
                        rowCount={remoteRowCount}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <List
                                height={750}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={remoteRowCount}
                                rowHeight={75}
                                rowRenderer={rowRendererCache}
                                width={280}
                            />
                        )}
                    </InfiniteLoader> : <Loading></Loading>
            }
        </div>
    );
};

export default MusicList;