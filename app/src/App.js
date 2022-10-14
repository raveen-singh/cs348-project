import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [message, setMessage] = useState(0);

  const [dbMessage, setDbMessage] = useState(0);

  useEffect(() => {
    fetch('/api').then(res => res.json()).then(data => {
      setMessage(data.message);
    });
  }, []);

  useEffect(() => {
    fetch('/api/db').then(res => res.json()).then(data => {
      setDbMessage(data.message);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{message}</p>
        <p>{dbMessage}</p>
      </header>
    </div>
  );
}

export default App;
