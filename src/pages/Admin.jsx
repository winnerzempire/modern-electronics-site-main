import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Replace with your token retrieval method

    console.log("Authorization Header:", `Bearer ${token}`); // Debug log

    axios
      .get('https://viqtech.co.ke/api/admin/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching admin data:", err);
        setError(err.response ? err.response.data.detail || "An error occurred" : err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name || "Unnamed Item"}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPage;
