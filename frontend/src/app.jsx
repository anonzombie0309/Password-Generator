import { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(12);
  const [sets, setSets] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (length <= 0) {
      alert("Password length must be greater than 0");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length, sets }),
      });

      const data = await response.json();
      setPassword(data.password);
      setShow(false);
    } catch (err) {
      console.error("Backend error:", err);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <h1>Password Generator 🔐</h1>

      <label>Password Length</label>
      <input
        type="number"
        value={length === 0 ? '' : length}
        min={1}
        max={128}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          if (!isNaN(val)) {
            setLength(val);
          } else {
            setLength(0);
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

      {password && (
        <div className="password-box">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            readOnly
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
