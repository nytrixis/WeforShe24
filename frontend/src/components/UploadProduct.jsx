import React, { useState } from 'react';
import axios from 'axios';

const UploadProduct = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', description);
      formData.append('userId', 'user123'); // Replace with actual user ID

      await axios.post('/api/thrift-store/upload', formData);
      alert('Product uploaded successfully!');
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="max-padd-container py-12">
      <h2 className="h3 mb-8">Upload Product for Thrifting</h2>
      <input type="file" onChange={handleImageUpload} accept="image/*" className="mb-4" />
      {image && <img src={image} alt="Uploaded product" className="w-64 h-64 object-cover mb-4" />}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product description"
        className="w-full p-2 mb-4 border rounded"
      />
      <button onClick={handleSubmit} className="btn-secondary">Thrift it to the World!</button>
    </div>
  );
};

export default UploadProduct;
