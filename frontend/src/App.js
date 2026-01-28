import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [health, setHealth] = useState('Checking...');
  const [error, setError] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    // Fetch health status
    fetch(`${backendUrl}/api/health`)
      .then(response => response.json())
      .then(data => {
        setHealth(data.message);
      })
      .catch(err => {
        console.error('Health check failed:', err);
        setHealth('Backend unavailable');
      });

    // Fetch message
    fetch(`${backendUrl}/api/message`)
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(err => {
        console.error('Message fetch failed:', err);
        setError('Failed to connect to backend');
      });
  }, [backendUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full-Stack DevOps Pipeline Demo</h1>
        <div className="info-container">
          <div className="info-card">
            <h2>Frontend</h2>
            <p>React Application</p>
            <span className="badge">Running</span>
          </div>
          <div className="info-card">
            <h2>Backend</h2>
            <p>{health}</p>
            <span className={health.includes('successfully') ? 'badge success' : 'badge error'}>
              {health.includes('successfully') ? 'Running' : 'Down'}
            </span>
          </div>
        </div>
        <div className="message-box">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <p className="message">{message}</p>
          )}
        </div>
        <div className="tech-stack">
          <h3>Technology Stack</h3>
          <ul>
            <li>React (Frontend)</li>
            <li>Spring Boot (Backend)</li>
            <li>Docker (Containerization)</li>
            <li>Jenkins (CI/CD)</li>
            <li>Kubernetes (Orchestration)</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
