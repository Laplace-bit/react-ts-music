
import { lazy } from 'react'
// 懒加载
const Home = lazy(() => import("@/components/Home"));
const Music = lazy(() => import("@/components/music/Music"));
const Demo = lazy(() => import("@/components/demo"));
const FileSystem = lazy(() => import("@/components/fileSystem"));
const routesList = [
    {
        exact: true,
        path: "/",
        component: Home
    },
    {
        exact: true,
        path: "music",
        component: Music
    },
    {
        exact: true,
        path: "files",
        component: FileSystem
    },
    {
        exact: true,
        path: "/3D",
        component: Demo
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