import Home from "../components/Home";
import Music from "../components/music/Music";

const routesList = [
    {
        exact: true,
        path: "/",
        component: <Home />
    },
    {
        exact: true,
        path: "music",
        component: <Music />
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