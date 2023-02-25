import React, { useState, useRef, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, theme, Button, ConfigProvider, Space } from 'antd';
import "./global.css"
import DiyMenu from "./components/menu/DiyMenu";
import ErrorBoundary from "./components/Error/index";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routesList from "./router/routerConfig"
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
    <Router>
      <ConfigProvider direction="ltr" theme={{
        algorithm: currTheme.current,
        token: {
          colorPrimary: '#00b96b',
        }
      }}
      >
        <ErrorBoundary>
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
              <DiyMenu isDark={isDark} ></DiyMenu>
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
                <Routes>
                  {routesList.map((item) => <Route path={item.path} element={item.component} key={item.path} />)}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                {/* <Routes /> */}
              </Content>
            </Layout>
          </Layout>
        </ErrorBoundary>
      </ConfigProvider>
    </Router >
  );
};

export default App;
