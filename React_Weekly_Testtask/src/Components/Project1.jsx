import React, { useState, useEffect } from 'react';

export default function Project1() {
  const [count, setCount] = useState(0);
  const [autoIncrement, setAutoIncrement] = useState(false);

  useEffect(() => {
    let intervalId;

    if (autoIncrement) {
      intervalId = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [autoIncrement]);

  return (
    <div className="container text-center mt-5 p-4 rounded shadow">
      <h2 className="display-4">Counter : {count}</h2>

      <div className="my-3">
        <button className="btn btn-danger mx-2" onClick={() => setCount(count - 1)}>Decrement</button>
        <button className="btn btn-success mx-2" onClick={() => setCount(count + 1)}>Increment</button>
        <button className="btn btn-secondary mx-2" onClick={() => setCount(0)}>Reset</button>
      </div>

      <div className="mt-4">
        <button
          className={`btn ${autoIncrement ? 'btn-warning' : 'btn-primary'}`}
          onClick={() => setAutoIncrement(!autoIncrement)}
        >
          {autoIncrement ? '⏹ Stop Auto-Increment' : '▶ Start Auto-Increment'}
        </button>
      </div>
    </div>
  );
}
