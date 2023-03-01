import React, { useState } from 'react';
import { Input } from 'antd';
const { Search } = Input;


const SearchBar: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [song, setSong] = useState<string>('');

    const searchHandler = (val: string) => {
        try {
            setLoading(true);
            console.log(val);
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