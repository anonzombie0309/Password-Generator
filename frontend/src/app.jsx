import { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(null);  // null initially
  const [sets, setSets] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');

    if (!length || length <= 0) {
      setError("Please enter a valid password length greater than 0");
      setPassword('');
      return;
    }

    if (length > 128) {
      setError("Password length must not exceed 128 characters");
      setPassword('');
      return;
    }

    const selectedSets = Object.values(sets).filter(Boolean);
    if (selectedSets.length === 0) {
      setError("Please select at least one character set");
      setPassword('');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API || 'http://localhost:5000'}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length, sets }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      if (!data.password || typeof data.password !== 'string') {
        throw new Error("Invalid response from server");
      }

      setPassword(data.password);
      setShow(false);
      setCopied(false);
    } catch (err) {
      console.error("Backend error:", err);
      setError("Unable to generate password. Please try again later.");
      setPassword('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      setError("Copy not supported in this browser.");
    }
  };

  return (
    <div className="container">
      <h1>Password Generator 🔐</h1>

      {error && <div className="error">{error}</div>}

      <label>Password Length</label>
      <input
        type="number"
        value={length === null ? '' : length}
        placeholder="Enter the length of password"
        min={1}
        max={128}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          if (!isNaN(val)) {
            setLength(val);
          } else {
            setLength(null);
          }
        }}
      />

      <div className="options">
        {['upper', 'lower', 'numbers', 'symbols'].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              checked={sets[type]}
              onChange={() => setSets({ ...sets, [type]: !sets[type] })}
            />
            {' '}
            {type === 'upper' && 'A-Z'}
            {type === 'lower' && 'a-z'}
            {type === 'numbers' && '0-9'}
            {type === 'symbols' && 'Special Characters'}
          </label>
        ))}
      </div>

      <button className="generate-btn" onClick={handleGenerate}>
        Generate Password
      </button>

      {password && !error && (
        <div className="password-box">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            readOnly
            aria-label="Generated password"
          />
          <button onClick={() => setShow(!show)}>
            {show ? 'Hide' : 'Show'}
          </button>
          <button onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
