import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import PublicLayout from './components/layout/PublicLayout'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import ConnectionsPage from './pages/connections/ConnectionsPage'
import CredentialsPage from './pages/credentials/CredentialsPage'
import VerificationsPage from './pages/verifications/VerificationsPage'
import ProfilePage from './pages/profile/ProfilePage'
import SettingsPage from './pages/settings/SettingsPage'

const App: React.FC = () => {
  // Simple authentication check
  const isAuthenticated = (): boolean => {
    return localStorage.getItem('token') !== null
  }

  // Protected route component
  const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    return isAuthenticated() ? <>{element}</> : <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute element={<AuthLayout />} />
          }
        >
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/connections" element={<ConnectionsPage/>} />
          <Route path="/credentials" element={<CredentialsPage/>} />
          <Route path="/verifications" element={<VerificationsPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
