import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/NotFound';
import AuthContext from './components/AuthContext';
import AdminRoutes from './pages/Admin/AdminRoutes';

function App() {
  const token = localStorage.getItem('user');
  return (
    <AuthContext>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={token ? <AdminRoutes /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext>
  )
}

export default App
