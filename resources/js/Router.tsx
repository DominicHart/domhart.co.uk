import React, { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Portfolio from "./routes/Portfolio";
import Nav from './components/Nav';

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Nav />
    {children}
  </>
);

const routes = [
  {
    path: '/portfolio',
    element: <Portfolio />,
  },
  {
    path: '/',
    element: <Home />,
  },
];

const router = createBrowserRouter(routes.map(route => ({
  ...route,
  element: <AppLayout>{route.element}</AppLayout>,
})));

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
}

export default Router;