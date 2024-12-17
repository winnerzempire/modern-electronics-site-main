// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from an API with authentication
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2MzE5ODk1LCJpYXQiOjE3MjYzMTk1OTUsImp0aSI6ImVhMTFiY2M4NWI2YjQzN2NiZWU3MGVhMGYzMjQ5YjhlIiwidXNlcl9pZCI6Mn0.fHxfK-5-bVK67HXvnc5vIxwv0i4uA4rd4L-rnQzFkuw";

    axios
      .get('https://viqtech.co.ke/api/users/', {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.response?.data?.detail || error.message}</p>;

  return (
    <div>
      <h1>Admin Page</h1>
      {/* Render admin functionalities, such as tables or forms */}
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
