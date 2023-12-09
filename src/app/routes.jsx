import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/SignUp';

// My search page
const SearchRides = Loadable(lazy(() => import('app/views/SearchRides')));

const routes = [
  {
    element: (
      <MatxLayout />
    ),
    children: [
      // Ride Routes
      {
        path: '/searchRides',
        element: <SearchRides />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ]
  },
  { path: '/', element: <Navigate to="/login" /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
];

export default routes;
