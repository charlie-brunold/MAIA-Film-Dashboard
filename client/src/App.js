import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import page components
import Dashboard from './pages/Dashboard';
import ScriptWriter from './pages/ScriptWriter';
import Storyboard from './pages/Storyboard';
import Budget from './pages/Budget';
import Analysis from './pages/Analysis';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scriptwriter" element={<ScriptWriter />} />
            <Route path="/storyboard" element={<Storyboard />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;