import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AuthCheck from './pages/AuthCheck'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/auth-check" 
          element={
            <ProtectedRoute>
              <AuthCheck />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <AuthCheck />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App 