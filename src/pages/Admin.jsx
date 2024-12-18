import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = "your_token_here"; // Make sure this token is valid

    console.log("Authorization Header:", `Bearer ${token}`); // Debug log

    axios
      .get('https://viqtech.co.ke/admin/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        // Handle the error gracefully
        setError(err.response ? err.response.data.detail : err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;  {/* Simplified error display */}

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
