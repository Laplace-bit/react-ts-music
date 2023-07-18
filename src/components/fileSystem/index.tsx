import React, { useRef, useState, lazy } from 'react';

import { Tabs, type TabsProps } from 'antd';
import { useAppDispatch } from '@/store/hooks';
const Image = lazy(() => import("./image"))
const File = lazy(() => import("./file"))

const onChange = (key: string) => {
    console.log(key);
};


const FileStytem: React.FC = () => {
    const tabList: TabsProps['items'] = [
        { label: 'image', key: '1', children: <Image /> },
        { label: 'file', key: '2', children: <File /> },
    ]
    const dispatch = useAppDispatch();
    return (
        <Tabs
            onChange={onChange}
            type="card"
            items={tabList}
        />
    );
}

export default FileStytem;