
// 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

import React, { useEffect, useRef, useState } from 'react'
import "./ImageGenerator.css"
import default_img from "../Assets/default_image.svg"
import axios from 'axios'; // Axios for making HTTP requests

const ImageGenerator = () => {

  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false)

  const apiKey = import.meta.env.VITE_API_KEY;


  const ImageGenerator = async () => {
    setLoading(true); // Set loading to true when the function starts
    const options = {
      method: 'POST', // HTTP method
      url: 'https://ai-image-generator3.p.rapidapi.com/generate', // API endpoint
      headers: {
        'x-rapidapi-key': `${apiKey}`, // API key
        'x-rapidapi-host': 'ai-image-generator3.p.rapidapi.com', // API host
        'Content-Type': 'application/json' // Content type of the request
      },
      data: {
        prompt: inputRef.current.value, // Data payload with the input text
        page: 1 // Page number for the API request
      }
    };

    try {
      const response = await axios.request(options); // Await the API response
      console.log('API Response:', response); // Log the API response
      setImage_url(response.data.results.images[0]); // Set the images state with the API response 
    } catch (error) {
      console.error('Error generating image:', error); // Log any errors
    } finally {
      setLoading(false); // Set loading to false when the function ends
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className="header">Ai Image <span>generator</span></div>
      <div className="img-loading">
        <div className="image"><img src={image_url === "/" ? default_img : image_url} alt="" />
          <div className="loading">
            <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
            <div className={loading ? "loading-text" : "display-none"}>Loadinng...</div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
        <div className="generate-btn" onClick={() => { ImageGenerator() }}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator
