import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import SmsPolicy from './pages/SmsPolicy';
import Help from './pages/Help';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="sms-policy" element={<SmsPolicy />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
}