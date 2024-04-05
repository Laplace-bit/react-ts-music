import { Layout, Select, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import DiyMenu from "../menu/DiyMenu";
import React from "react";
import { LoadingOutlined, WifiOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Outlet, RouterProvider } from "react-router-dom";



const Root: React.FC = () => {
    return (
        <Layout>
            {
                <Sider trigger={null} collapsible collapsedWidth='0'
                    // collapsed={collapsed}
                    // theme={themeValue === "darkAlgorithm" ? 'dark' : 'light'}
                    breakpoint='md'>
                    <div className="logo" />
                    <DiyMenu></DiyMenu>
                </Sider>
            }
            {/* 侧边栏 */}
            <Layout className="site-layout">
                <div className='header-box'>
                    {/* <Space size={20}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <Select
                            defaultValue='defaultAlgorithm'
                            style={{ width: 120 }}
                            onChange={changeTheme}
                            options={themeOptions}
                            value={themeValue}
                        />
                        {isOnline ? <WifiOutlined /> : <LoadingOutlined />}
                    </Space> */}
                </div>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />

                </Content>
            </Layout>
        </Layout>)
}

export default Root;