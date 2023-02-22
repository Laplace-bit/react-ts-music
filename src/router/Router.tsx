// Router.tsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";

export default function Router() {
    {/* 所有的路由配置均在 BrowserRouter 内部 */ }
    return (
        <HashRouter>
            {/* 使用 Routes 替换曾经的 Switch */}
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
        </HashRouter>
    );
}