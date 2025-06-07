import React, { useState, useRef, useEffect } from 'react';
import '../App.css';

export default function Project3() {
  const [visible, setVisible] = useState(false); 
  const passwordRef = useRef(null);

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  return (
    <div className="container mt-5 p-4 shadow rounded" style={{ maxWidth: '400px' }}>
      <div className="form-group mt-3 fw-bold">
        <label htmlFor="password">Enter your password:</label>
        <div className="input-group">
          <input
            type={visible ? 'text' : 'password'}
            id="password"
            ref={passwordRef}
            className="mt-3 form-control"
            placeholder="Enter password"
          />
          <button
            type="button"
            className="mt-3 btn btn-outline-secondary"
            onClick={() => setVisible(!visible)}
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    </div>
  );
}
