
import { createBrowserRouter, redirect } from 'react-router-dom';
import routesList from "./routerConfig"
import Root from '@/components/root/root';
import { loginCheck } from '@/api/userRequest';
import { lazy } from 'react';
const Login = lazy(() => import("@/components/login"));
let isChecked = false;
const loader = async () => {
    if (isChecked) {
        return ''
    }
    isChecked = true
    const { header } = await loginCheck();
    if (header?.code === '0000') {
        return redirect('/home')
    } else {
        return redirect('/login')
    }
}

const router = createBrowserRouter([
    {
        path: "",
        element: <Root />,
        loader: loader,
        children: [
            ...routesList.map(item => {
                return {
                    path: item.path,
                    element: <item.component />,
                    // children: item.children
                }
            })

        ]
    }, {
        path: "/login",
        element: <Login></Login>
    }
]);


export default router
