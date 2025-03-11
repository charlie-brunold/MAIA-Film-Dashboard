import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">MAIA Film Dashboard</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/scriptwriter">Script Writer</Link>
          <Link to="/storyboard">Storyboard</Link>
          <Link to="/budget">Budget</Link>
          <Link to="/analysis">Analysis</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;