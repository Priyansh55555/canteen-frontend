import Login from './pages/auth/Login'
import Register from './pages/auth/Resigter'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import Cart from './pages/Cart'
import OrderHistory from './pages/OrderHistory';
import User from './pages/User';

export const routeConfig = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Register />,
    },
    {
        path: "/home",
        element: <Home />,
    },{
        path: "/dashboard",
        element: <Dashboard />,
    },{
        path: "/cart",
        element: <Cart />
    },{
        path: "/order-history",
        element: <OrderHistory />
    },{
        path: "/user",
        element: <User />
    }
];
