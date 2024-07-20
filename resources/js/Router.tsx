import React, { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Contact from "./routes/ContactNoForm";
import Login from "./routes/Login";
import Photos from "./routes/Photos";
import Portfolio from "./routes/Portfolio";
import Nav from './components/Nav';
import Footer from './components/Footer';

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Nav />
    {children}
    <Footer />
  </>
);

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/photos',
    element: <Photos />,
  },
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