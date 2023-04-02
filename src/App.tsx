import React, { useState, useRef, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, theme, Select, ConfigProvider, Space, App as AntdApp, message } from 'antd';
import "./global.css"
import DiyMenu from "./components/menu/DiyMenu";
import ErrorBoundary from "./components/Error/index";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routesList from "./router/routerConfig"
const { Sider, Content } = Layout;
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  window.$messageApi = messageApi;

  const themeOptions = useRef([
    { value: 'defaultAlgorithm', label: '默认模式', theme: theme.defaultAlgorithm },
    { value: 'darkAlgorithm', label: '黑暗模式', theme: theme.darkAlgorithm },
    { value: 'compactAlgorithm', label: '紧凑模式', theme: theme.compactAlgorithm },
  ])

  const [themeValue, setThemeValue] = useState('defaultAlgorithm');
  const [currTheme, setCurrTheme] = useState(() => theme.defaultAlgorithm);

  const changeTheme = (param: string) => {
    const theme: any = themeOptions.current.find(item => item.value === param)?.theme;
    setThemeValue(param);
    setCurrTheme(() => theme);
  }

  useEffect(() => {
    console.log("wellcome!");
  })

  return (
    <ErrorBoundary>
      <Router>
        <ConfigProvider direction="ltr" theme={{
          algorithm: currTheme,
          token: {
            colorPrimary: '#00b96b',
          },
        }}
        >
          {contextHolder}
          <AntdApp>
            <Layout>
              <Sider trigger={null} collapsible collapsedWidth='0' collapsed={collapsed}
                theme={themeValue === "darkAlgorithm" ? 'dark' : 'light'}
                breakpoint='md'>
                <div className="logo" />
                <DiyMenu></DiyMenu>
              </Sider>
              <Layout className="site-layout">
                <div className='header-box'>
                  <Space size={20}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: () => setCollapsed(!collapsed),
                    })}
                    <Select
                      defaultValue='defaultAlgorithm'
                      style={{ width: 120 }}
                      onChange={changeTheme}
                      options={themeOptions.current}
                      value={themeValue}
                    />
                  </Space>
                </div>
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
                </Content>
              </Layout>
            </Layout>
          </AntdApp>
        </ConfigProvider>
      </Router >
    </ErrorBoundary>
  );
};

export default App;
