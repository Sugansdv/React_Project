import React, { useEffect, useState } from 'react';

export default function Project4() {
  const [query, setQuery] = useState('');          
  const [users, setUsers] = useState([]);   
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState(null);       

  useEffect(() => {
    if (query === '') {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.github.com/search/users?q=${query}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setUsers(data.items);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="container mt-5 p-4 shadow rounded" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-3">🔍 GitHub User Search</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search GitHub users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="text-primary">Loading...</p>}
      {error && <p className="text-danger">❌ {error}</p>}
      {!loading && !error && users.length === 0 && query && (
        <p className="text-muted">No users found.</p>
      )}

      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex align-items-center">
            <img src={user.avatar_url} alt="avatar" width="40" className="rounded-circle me-3" />
            <div>
              <strong>{user.login}</strong><br />
              <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
