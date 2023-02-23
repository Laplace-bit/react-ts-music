import Routes from "./router/Router";
import React, { useState, useRef, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, ConfigProvider, Space } from 'antd';
import "./global.css"

const { Header, Sider, Content } = Layout;


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const currTheme = useRef(theme.darkAlgorithm);
  const themeList = useRef([theme.darkAlgorithm, theme.defaultAlgorithm]);

  const changeTheme = (param: any) => {
    if (isDark) {
      currTheme.current = themeList.current[1]
      setIsDark(false);
    } else {
      currTheme.current = themeList.current[0]
      setIsDark(true);
    }
  }
  useEffect(() => {
    console.log("wellcome!");
  })

  return (
    <ConfigProvider direction="ltr" theme={{
      algorithm: currTheme.current,
      token: {
        colorPrimary: '#00b96b',
      }
    }}
    >
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'music',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'dance',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'dev',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0 }}>
            <Space size={20}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
              <Button type="primary" size={'middle'} onClick={() => changeTheme(1)}>{isDark ? "明亮模式" : "黑暗模式"}</Button>
            </Space>

          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
