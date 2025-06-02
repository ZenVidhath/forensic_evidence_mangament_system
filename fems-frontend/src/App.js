import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import Evidence from "./pages/Evidence/Evidence";
import UserManagement from "./pages/Admin/UserManagement"; // Add this import
import Profile from "./pages/Profile"; // Add this import
import NewCase from "./pages/Cases/NewCase"; // Add this import
import CaseDetail from "./pages/Cases/CaseDetail"; // Add this import

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/data" element={
            <ProtectedRoute>
              <DataDisplay />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route element={<ProtectedRoute allowedRoles={["admin", "officer", "technician"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/evidence" element={<Evidence />} />
            <Route path="/cases/new" element={<NewCase />} />
            <Route path="/cases/:id" element={<CaseDetail />} />
          </Route>
          
          {/* Automatic Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;