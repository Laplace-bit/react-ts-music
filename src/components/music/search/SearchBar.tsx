import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBar: React.FC = () => (
    <Search placeholder="input search text" enterButton="Search" size="large" loading />
);

export default SearchBar;