import React, { createContext, useEffect, useState } from 'react';
import { theme, ConfigProvider, App as AntdApp, message } from 'antd';
import "./global.css"
import ErrorBoundary from "./components/Error/index";
import { RouterProvider } from 'react-router-dom';
import router from "./router"
import { ModalProvider, Modal } from './components/provider/ModalProvider';
import { themeList } from "@/constant/setting";
interface ThemeContextType {
  themeValue: string,
  setThemeValue: Function
}
const defaultContext: ThemeContextType = { themeValue: '', setThemeValue: Function.prototype }
export const ThemeContext = createContext(defaultContext);

const App: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();
  window.$messageApi = messageApi;

  const getTheme = (val: string) => {
    return themeList?.find(item => item.value === val)?.theme || theme.darkAlgorithm
  }

  const [themeValue, setThemeValue] = useState('darkAlgorithm')
  const [currTheme, setCurrTheme] = useState(() => getTheme(themeValue));
  useEffect(() => {
    setCurrTheme(() => getTheme(themeValue));
  }, [themeValue])


  return (
    <ErrorBoundary>
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
            <ThemeContext.Provider value={{ themeValue, setThemeValue }}>
              <RouterProvider router={router} />
            </ThemeContext.Provider>
          </ModalProvider>
        </AntdApp>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
