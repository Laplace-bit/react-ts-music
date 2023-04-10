
import { lazy } from 'react'
// 懒加载
const Home = lazy(() => import("../components/Home"));
const Music = lazy(() => import("../components/music/Music"));

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