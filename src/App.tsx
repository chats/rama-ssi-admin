import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import VerificationsPage from './pages/verifications/VerificationsPage'
import ProfilePage from './pages/profile/ProfilePage'
import SettingsPage from './pages/settings/SettingsPage'
import TestOfferPage from './pages/credentials/TestOfferPage'
import HolderConnectionPage from './pages/connections/HolderConnectionPage'
import VerifierConnectionPage from './pages/connections/VerifierConnectionPage'
import IssuerConnectionPage from './pages/connections/IssuerConnectionPage'
import VerificationsDemoPage from './pages/verifications/VerificationsDemoPage'
import IssuedCredentialRecordPage from './pages/credentials/IssuedCredentialRecordPage'
import LoadingDemo from './pages/demo/LoadingDemo'
import ProofRecordPage from './pages/credentials/ProofRecordPage'
import AuthLayout from './components/layout/AuthLayout'
import OfferMedicalCertPage from './pages/issue-credential/OfferMedicalCertPage'
import CredentialsPage from './pages/credentials/CredentialsPage'

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
          <Route path="/connections">
            <Route path="issuer" element={<IssuerConnectionPage/>} />
            <Route path="holder" element={<HolderConnectionPage />} />
            <Route path="verifier" element={<VerifierConnectionPage />} />
          </Route>
          <Route path="/credentials">
            <Route path="issued" element={<IssuedCredentialRecordPage />} />
            <Route path="proofs" element={<ProofRecordPage />} />
            <Route path="holder" element={<CredentialsPage/>} />
          </Route>
          <Route path="/issue-credential">
            <Route path="offer-medical-cert" element={<OfferMedicalCertPage/>} />
          </Route>
          <Route path="/present-proof">
            <Route path="verifications-demo" element={<VerificationsDemoPage/>} />
            <Route path="verifications" element={<VerificationsPage/>} />
          </Route>

          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/demo/loading" element={<LoadingDemo/>} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
