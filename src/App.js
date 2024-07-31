import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import { Alert } from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landingpage';
import NoteState from './context/notes/NoteState';
import { useState, useEffect } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth-token');
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <NoteState>
      <Router>
        <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Landing />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/login" element={<Login showAlert={showAlert} handleLogin={handleLogin} />} />
          <Route path="/home" element={isAuthenticated ? <Home showAlert={showAlert} /> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
