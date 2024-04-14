
import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./index";
import { Provider } from "react-redux"
import { store } from "./store/store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


// StrictMode  模式 react 渲染时自动触发两次useEffect 便于开发时发现一些未清理操作导致的异常
root.render(
    <React.StrictMode>
        <React.Suspense fallback={<div className="suspense-box" style={{ backgroundColor: 'black', width: '100', height: '100vh' }}>loading...</div>}>
            <Provider store={store}>
                <App />
            </Provider>
        </React.Suspense>
    </React.StrictMode>
);

