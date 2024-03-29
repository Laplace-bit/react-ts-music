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
import Login from './components/login';
import { useAppSelector } from './store/hooks';
// import { loginCheck } from '@/api/userRequest';
// import useAsync from '@/hooks/useAsync';
// import { useAppDispatch } from '@/store/hooks';
// import { userChange } from '@/store/features/users-silce';
import { ModalProvider, Modal } from './components/provider/ModalProvider';

const { Sider, Content } = Layout;
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const loginFlag = useAppSelector((state) => state.user.loginFlag);

  const [messageApi, contextHolder] = message.useMessage();
  window.$messageApi = messageApi;

  const themeOptions = useRef([
    { value: 'defaultAlgorithm', label: '默认模式', theme: theme.defaultAlgorithm },
    { value: 'darkAlgorithm', label: '黑暗模式', theme: theme.darkAlgorithm },
    { value: 'compactAlgorithm', label: '紧凑模式', theme: theme.compactAlgorithm },
  ])

  const [themeValue, setThemeValue] = useState('darkAlgorithm');
  const [currTheme, setCurrTheme] = useState(() => theme.darkAlgorithm);

  const changeTheme = (param: string) => {
    const theme: any = themeOptions.current.find(item => item.value === param)?.theme;
    setThemeValue(param);
    setCurrTheme(() => theme);
  }

  // 请求处理hook
  // const { sendHttp } = useAsync()
  // const dispatch = useAppDispatch();

  // const loginCheckHandler = async () => {
  //   try {
  //     sendHttp(loginCheck().then((res) => {
  //       if (res && res.errno === 0) {
  //         dispatch(userChange({ loginFlag: true }))
  //         window.$messageApi.destroy()
  //         window.$messageApi.open({
  //           type: 'success',
  //           content: res.msg,
  //         });
  //       } else {
  //         dispatch(userChange({ loginFlag: false }))
  //       }
  //     })
  //     )
  //   } catch (error) {
  //     console.error("catch error in loginCheckHandler :", error)
  //   }
  // }
  // useEffect(() => {
  //   loginCheckHandler()
  //   console.log("wellcome!");
  // }, [])

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
