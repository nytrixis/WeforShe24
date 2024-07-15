import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowseProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/thrift-store/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-padd-container py-12">
      <h2 className="h3 mb-8">Products Available</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={product.image} alt={product.description} className="w-full h-64 object-cover" />
            <div className="p-4">
              <p className="medium-16 mb-2">{product.description}</p>
              <p className="text-gray-600">Uploaded by: {product.userId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseProducts;
