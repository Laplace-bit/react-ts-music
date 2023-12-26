
import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./index";
import { Provider } from "react-redux"
import { store } from "./store/store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.Suspense fallback={<div className="suspense-box" style={{ backgroundColor: 'black', width: '100', height: '100vh' }}>loading...</div>}>
        <Provider store={store}>
            <App />
        </Provider>
    </React.Suspense>
);

