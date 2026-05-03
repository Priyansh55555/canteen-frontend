import Login from './pages/auth/Login'
import Register from './pages/auth/Resigter'
import Dashboard from './pages/adminpages/Dashboard';
import Cart from './pages/Cart'
import OrderHistory from './pages/OrderHistory';
import User from './pages/User';
import Profile from './pages/user/Profile';
import OrderQueue from './pages/adminpages/OrderQueue';
import MenuManagment from './pages/adminpages/MenuManagment';
import Menu from './pages/Menu';

export const routeConfig = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Register />,
    },{
        path: "/dashboard",
        element: <Dashboard />,
    }, {  path: "/cart",
        element: <Cart />
    }, {
        path: "/order-history",
        element: <OrderHistory />
    }, {
        path: "/user",
        element: <User />
    }, {
        path: "/menu-managment",
        element: <MenuManagment />
    },{
        path: "/order-queue",
        element: <OrderQueue />
    },{
        path: "/menu",
        element: <Menu />
    }, {
        path: "/profile",
        element: <Profile />
    }
];
