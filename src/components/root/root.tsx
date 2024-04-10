import { Layout, Select, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import DiyMenu from "../menu/DiyMenu";
import React, { useContext, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, WifiOutlined, LoadingOutlined } from '@ant-design/icons';
import { ThemeContext } from "@/App";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { themeList } from "@/constant/setting";


const Root: React.FC = () => {
    const { themeValue, setThemeValue } = useContext(ThemeContext);

    const changeTheme = (param: string) => {
        const { value } = themeList.find(item => item.value === param) || { theme: theme.darkAlgorithm, value: 'darkAlgorithm' }
        setThemeValue(value)
    }

    const [collapsed, setCollapsed] = useState(false);

    // 检查网络状态
    const isOnline = useOnlineStatus();

    return (
        <Layout>
            {
                <Sider trigger={null} collapsible collapsedWidth='0'
                    collapsed={collapsed}
                    theme={themeValue === "darkAlgorithm" ? 'dark' : 'light'}
                    breakpoint='md'>
                    <div className="logo" />
                    <DiyMenu></DiyMenu>
                </Sider>
            }
            <Layout className="site-layout">
                <div className='header-box'>
                    <Space size={20}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <Select
                            defaultValue='darkAlgorithm'
                            style={{ width: 120 }}
                            onChange={changeTheme}
                            options={themeList}
                            value={themeValue}
                        />
                        {isOnline ? <WifiOutlined /> : <LoadingOutlined />}
                    </Space>
                </div>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {/* 路由渲染 */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>)
}

export default Root;