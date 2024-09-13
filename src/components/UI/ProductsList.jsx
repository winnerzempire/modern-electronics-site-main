import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import './product.css'; // Import the CSS file

const ProductsList = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://viqtech.co.ke/api/products/products/');
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const searchTermLower = searchTerm ? searchTerm.toLowerCase() : '';
  const filteredData = data.filter((item) =>
    item.productName && item.productName.toLowerCase().includes(searchTermLower)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="products-list">
      {filteredData.length === 0 ? (
        <p>No products found</p>
      ) : (
        filteredData.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
};

export default ProductsList;
