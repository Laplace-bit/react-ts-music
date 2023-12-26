import React, { useState, useRef } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, WifiOutlined, LoadingOutlined } from '@ant-design/icons';
import { Layout, theme, Select, ConfigProvider, Space, App as AntdApp, message } from 'antd';
import "./global.css"
import DiyMenu from "./components/menu/DiyMenu";
import ErrorBoundary from "./components/Error/index";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routesList from "./router/routerConfig"
import Login from './components/login';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ModalProvider, Modal } from './components/provider/ModalProvider';
import useOnlineStatus from './hooks/useOnlineStatus';
import { themeChange } from './store/features/setting-silce';

const { Sider, Content } = Layout;
const App: React.FC = () => {
  const loginFlag = useAppSelector((state) => state.user.loginFlag);

  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  window.$messageApi = messageApi;

  const { value: themeValue } = useAppSelector(state => state.theme);
  const themeOptions = [
    { value: 'defaultAlgorithm', label: '默认模式', theme: theme.defaultAlgorithm },
    { value: 'darkAlgorithm', label: '黑暗模式', theme: theme.darkAlgorithm },
    { value: 'compactAlgorithm', label: '紧凑模式', theme: theme.compactAlgorithm },
  ]
  const [currTheme, setCurrTheme] = useState(() => themeOptions.find(item => item.value === themeValue)?.theme || theme.darkAlgorithm);

  const changeTheme = (param: string) => {
    const themeCfg = themeOptions.find(item => item.value === param) || { value: themeValue, theme: theme.darkAlgorithm };
    dispatch(themeChange({ value: themeCfg.value }))
    setCurrTheme(() => themeCfg.theme);
  }

  // 检查网络状态
  const isOnline = useOnlineStatus();

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
            <ModalProvider>
              <Modal></Modal>
              {
                !loginFlag ?
                  <Layout>
                    <Routes>
                      <Route path="*" element={<Navigate to="/login" />} />
                      <Route path='/login' element={<Login />} />
                    </Routes>

                  </Layout>
                  :
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
                            options={themeOptions}
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
                        <Routes>
                          {routesList.map((item) => <Route path={item.path} element={<item.component></item.component>} key={item.path} />)}
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      </Content>
                    </Layout>
                  </Layout>
              }
            </ModalProvider>
          </AntdApp>
        </ConfigProvider>
      </Router >
    </ErrorBoundary>
  );
};

export default App;
