// src/components/ImageGenerator.js
import React, { useState } from 'react';
import axios from 'axios';
import './ImageGenerator.css';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/images/generate', { prompt });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-generator-container">
      <h2>Generate an Image</h2>
      <input
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {imageUrl && (
        <div className="generated-image">
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
