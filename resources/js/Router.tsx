import React, { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Contact from "./routes/ContactNoForm";
import Login from "./routes/Login";
import Photos from "./routes/Photos";
import Portfolio from "./routes/Portfolio";
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Nav />
    <div className="pt-[112px] md:pt-0">
      {children}
    </div>
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
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

const router = createBrowserRouter(routes.map(route => ({
  ...route,
  element: <AppLayout>{route.element}</AppLayout>,
})));

const Router: React.FC = () => {
  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
}

export default Router;