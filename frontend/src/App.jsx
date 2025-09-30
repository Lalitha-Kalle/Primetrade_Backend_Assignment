import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Users from './pages/Users';


function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <AuthProvider>
        
      <BrowserRouter>
      <Navbar/>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
      </AuthProvider>
    
    </>
  )
}

export default App
