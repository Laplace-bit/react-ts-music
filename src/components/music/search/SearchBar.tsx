import React, { useState } from 'react';
import { Input } from 'antd';
import { searchSong } from '@/api/songRequest';
import { useAppDispatch } from '@/store/hooks';
import { loadSongList, resetList } from '@/store/features/songlist-slice';
import MusicFunc from '@/tools/musicFunc';
const { Search } = Input;

const SearchBar: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [song, setSong] = useState<string>('');
    const dispatch = useAppDispatch();

    const searchHandler = async (val: string) => {
        try {
            setLoading(true);
            const { result: { songs } } = await searchSong(song);
            if (songs.length > 0) {
                // 重置列表
                dispatch(resetList())
            }
            dispatch(loadSongList(MusicFunc.listHandler(songs, 'searchSong')))
            console.log(songs);
        } catch (error) {
            console.error("catch error in SearchBar.searchHandler:", error)
        } finally {
            setLoading(false);
        }
    }
    const songChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLButtonElement;
        const { value } = target;
        setSong(value)
    }

    return (
        <Search
            placeholder="input song name"
            enterButton="Search"
            size="large"
            loading={loading}
            style={{
                marginBottom: '0.5rem'
            }}
            value={song}
            onChange={songChange}
            onSearch={searchHandler}
        />
    )
}

export default SearchBar;