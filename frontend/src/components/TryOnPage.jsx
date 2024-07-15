import React, { useState } from 'react';
import p_15 from '../assets/prod.jpeg';
import outputImage from '../assets/output.png';

const TryOnPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    if (uploadedImage) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShowOutput(true);
      }, 5000);
    }
  };

  return (
    <div className="max-padd-container py-8">
      <h1 className="h2 mb-8 text-center">Try On Experience</h1>
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex-1">
          <h2 className="h3 mb-4">Desired Product:</h2>
          <div className="w-[385px] h-[512px] overflow-hidden">
            <img src={p_15} alt="Desired Product" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="h3 mb-4">Upload Image:</h2>
          <input type="file" onChange={handleImageUpload} accept="image/*" className="mb-4" />
          <div className="w-[385px] h-[512px] overflow-hidden mb-4">
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Upload an image</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleUploadClick}
            disabled={!uploadedImage || isProcessing}
            className={`w-full py-2 px-4 rounded transition duration-300 ${
              isProcessing ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-green-500'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Upload and Process'}
          </button>
        </div>
        <div className="flex-1">
          <h2 className="h3 mb-4">Desired Output:</h2>
          <div className="w-[385px] h-[512px] overflow-hidden">
            {showOutput ? (
              <img src={outputImage} alt="Output" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Output will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnPage;
