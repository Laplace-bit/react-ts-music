import React from 'react';
import { Menu } from 'antd';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import "./DiyMenu.less"

function DiyMenu(props: any) {

    const navigate = useNavigate();
    // const { isDark } = props;

    /**
     * 路由跳转
    */
    const routerHandle = (e: any) => {
        console.log(e.keyPath)
        //push跳转 以params参数为例，navigate默认开启push模式
        navigate(e.keyPath[0], { replace: true })
    }

    return (
        <Menu
            // theme={isDark ? 'dark' : 'light'}
            // mode="inline"
            // defaultSelectedKeys={['/home']}
            onClick={routerHandle}
            items={[
                {
                    key: '/home',
                    icon: <UserOutlined />,
                    label: 'home',
                },
                {
                    key: '/music',
                    icon: <VideoCameraOutlined />,
                    label: 'music',
                },
                {
                    key: '/dev',
                    icon: <UploadOutlined />,
                    label: 'dev',
                },
            ]}
        />
    );
};

export default DiyMenu;









