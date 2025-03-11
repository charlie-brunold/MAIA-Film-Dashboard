import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

// Import components
import DashboardCard from '../components/dashboard/DashboardCard';

const Dashboard = () => {
  const tools = [
    {
      id: 'scriptwriter',
      title: 'Script Writer',
      description: 'Create and edit your screenplay with AI assistance.',
      path: '/scriptwriter'
    },
    {
      id: 'storyboard',
      title: 'Storyboard',
      description: 'Visualize your scenes and plan your shots.',
      path: '/storyboard'
    },
    {
      id: 'budget',
      title: 'Budget Calculator',
      description: 'Plan and optimize your film budget.',
      path: '/budget'
    },
    {
      id: 'analysis',
      title: 'ROI Analysis',
      description: 'Predict performance and analyze potential returns.',
      path: '/analysis'
    }
  ];

  return (
    <section id="dashboard">
      <h1>Film Production Dashboard</h1>
      <p>Welcome to your all-in-one film production assistant powered by AI.</p>
      
      <div className="dashboard">
        {tools.map(tool => (
          <DashboardCard 
            key={tool.id}
            title={tool.title}
            description={tool.description}
            path={tool.path}
          />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;