import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState({ status: 'Loading...', message: '' });
  const [backendInfo, setBackendInfo] = useState({});
  const [error, setError] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || '';

  useEffect(() => {
    fetchBackendHealth();
    fetchBackendInfo();
  }, [backendUrl]);

  const fetchBackendHealth = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/health`);
      const data = await response.json();
      setBackendStatus(data);
      setError(null);
    } catch (err) {
      setError('Unable to connect to backend service');
      console.error('Backend health check failed:', err);
    }
  };

  const fetchBackendInfo = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/info`);
      const data = await response.json();
      setBackendInfo(data);
    } catch (err) {
      console.error('Backend info fetch failed:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Full-Stack DevOps Pipeline</h1>
        <p className="subtitle">React + Spring Boot + Docker + Jenkins + Kubernetes</p>
        
        <div className="status-container">
          <div className="status-card">
            <h2>Frontend Status</h2>
            <div className="status-badge success">
              ✓ Running
            </div>
            <p>React Application</p>
          </div>

          <div className="status-card">
            <h2>Backend Status</h2>
            <div className={`status-badge ${error ? 'error' : 'success'}`}>
              {error ? '✗ Offline' : '✓ Running'}
            </div>
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <>
                <p>{backendStatus.message}</p>
                {backendInfo.application && (
                  <div className="info-details">
                    <p><strong>Version:</strong> {backendInfo.version}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="features">
          <h2>Pipeline Components</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="icon">⚛️</span>
              <h3>React</h3>
              <p>Modern frontend framework</p>
            </div>
            <div className="feature">
              <span className="icon">☕</span>
              <h3>Spring Boot</h3>
              <p>Robust backend API</p>
            </div>
            <div className="feature">
              <span className="icon">🐳</span>
              <h3>Docker</h3>
              <p>Container orchestration</p>
            </div>
            <div className="feature">
              <span className="icon">🔧</span>
              <h3>Jenkins</h3>
              <p>CI/CD automation</p>
            </div>
            <div className="feature">
              <span className="icon">☸️</span>
              <h3>Kubernetes</h3>
              <p>Deployment & scaling</p>
            </div>
          </div>
        </div>

        <button className="refresh-button" onClick={() => {
          fetchBackendHealth();
          fetchBackendInfo();
        }}>
          🔄 Refresh Status
        </button>
      </header>
    </div>
  );
}

export default App;
