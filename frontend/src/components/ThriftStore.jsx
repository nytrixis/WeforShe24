import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ThriftStore = () => {
  return (
    <div className="max-padd-container py-12">
      <h1 className="h2 text-center mb-8">Thrift Store</h1>
      <div className="flex justify-center space-x-8">
        <Link to="/thrift-store/upload" className="btn-secondary">Upload Product</Link>
        <Link to="/thrift-store/browse" className="btn-secondary">Browse Products</Link>
      </div>
    </div>
  );
};

export default ThriftStore;
