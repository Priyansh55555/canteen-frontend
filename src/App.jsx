import React,{ useEffect} from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routeConfig } from './routeConfig';
import Layout from './components/layout/Layout';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useGetUser } from "./hooks/AuthHook";
export const Axios = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,  
});


const publicRoutes = ["/login", "/signup"];

const App = () => {
  const renderRoutes = (config) => (
    config.map(({ path, element, children }, index) => (
      <Route key={`${index}-${path}`} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ))
  );

  const { data: user , isLoading } = useGetUser();

  const location = useLocation();
  const currentRoute = location.pathname;
  const navigate = useNavigate();


  useEffect(()=>{
    if(!user && !isLoading && !publicRoutes.includes(currentRoute)){
      navigate("/");
    }
  },[isLoading, user])

  return (
    <div>
      <Layout>
        <Routes>
          {renderRoutes(routeConfig)}
        </Routes>
      </Layout>
      <Toaster />
    </div>
  );
};

export default App;
