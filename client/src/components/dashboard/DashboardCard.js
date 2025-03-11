import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardCard.css';

const DashboardCard = ({ title, description, path }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={path}>
        <button>Open Tool</button>
      </Link>
    </div>
  );
};

export default DashboardCard;