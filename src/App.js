import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About.js';
import { Alert } from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState.js';

function App() {
  return (
    <NoteState>
    <BrowserRouter>
    <div>
          <NavBar />
          <Alert message="This is amazing React course" />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
