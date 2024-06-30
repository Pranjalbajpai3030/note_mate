import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About.js';
import { Alert } from './components/Alert';
import NoteState from './context/notes/NoteState.js';

function App() {
  return (
    <NoteState>
    <BrowserRouter>
      <div>
      
        <NavBar />
        <Alert message="This is amazing React course" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
