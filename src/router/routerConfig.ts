
import { loginCheck } from '@/api/userRequest';
import { lazy } from 'react'
import { redirect } from 'react-router-dom';
// 懒加载
const Home = lazy(() => import("@/components/Home"));
const Music = lazy(() => import("@/components/music/Music"));
const Demo = lazy(() => import("@/components/demo"));
const Polls = lazy(() => import("@/components/polls"));
const FileSystem = lazy(() => import("@/components/fileSystem"));
const Login = lazy(() => import("@/components/login"));



const routesList = [
    {
        // exact: true,
        path: "/home",
        component: Home,
    },
    // {
    //     // exact: true,
    //     path: "/login",
    //     component: Login,
    // },
    {
        exact: true,
        path: "music",
        component: Music,
    },
    {
        exact: true,
        path: "files",
        component: FileSystem,
    },
    {
        exact: true,
        path: "3D",
        component: Demo
    },
    {
        exact: true,
        path: "polls",
        component: Polls,
    },
    //   {
    //     path: "/test",
    //     component: Tacos,
    //     routes: [
    //       {
    //         path: "/tacos/bus",
    //         component: Bus
    //       },
    //       {
    //         path: "/tacos/cart",
    //         component: Cart
    //       }
    //     ]
    //   }
];

export default routesList;