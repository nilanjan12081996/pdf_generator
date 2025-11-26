import React from 'react';
import OutsideLayout from '../ui/layout/OutsideLayout.jsx';
import InsideLayout from '../ui/layout/InsideLayout.jsx';

import Login from '../pages/Auth/Login.jsx';
import Landing from '../pages/Landing/Landing.jsx';
import Registration from '../pages/Auth/Registration.jsx';
import GenerateReport from '../pages/GenerateReport/GenerateReport.jsx';
import History from '../pages/Landing/History.jsx';




const allRoutes = [
  {
    path: '/',
    element: <OutsideLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/register',
    element: <OutsideLayout />,
    children: [{ index: true, element: <Registration /> }],
  },
  {
    path: '/home',
    element: <InsideLayout />,
    children: [{ index: true, element: <Landing /> }],
  },

  {
    path: '/generate-report',
    element: <InsideLayout />,
    children: [{ index: true, element: <GenerateReport /> }],
  },
   {
    path: '/history',
    element: <InsideLayout />,
    children: [{ index: true, element: <History /> }],
  },

  {
    path: '*',
    element: 'Outside page not found',
  },
];
export default allRoutes;
