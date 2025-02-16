import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Notfound from '../pages/Notfound';

export default function AllRoutes() {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  };

  return (
    <Routes>
      <Route
        path='/'
        element={isLoggedIn() ? <Home /> : <Navigate to='/login' replace />}
      />
      <Route
        path='/login'
        element={isLoggedIn() ? <Navigate to='/' replace /> : <Login />} 
      />
      <Route
        path='/profile'
        element={isLoggedIn() ? <Profile /> : <Navigate to='/login' replace />} 
      />
      <Route
        path='/register'
        element={isLoggedIn() ? <Navigate to='/' replace /> : <Register />} 
      />
      <Route path='*' element={<Notfound />} />
    </Routes>
  );
}
