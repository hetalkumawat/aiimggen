const axios = require('axios');
const Image = require('../models/imageModel');


const generateImage = async (req, res) => {
  const { prompt } = req.body;
  try {
    // Send the request to Replicate API
    const response = await axios.post(
      'bingbangboom-lab/flux-dreamscape:b761fa16918356ee07f31fad9b0d41d8919b9ff08f999e2d298a5a35b672f47e',
      {
        version: "b761fa16",
        input: { prompt: prompt },  
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        },
      } 
    );
 
    const imageUrl = response.data?.output[0];  // Adjust based on actual response structure

    const image = new Image({ prompt, imageUrl });
    await image.save();

    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { generateImage };