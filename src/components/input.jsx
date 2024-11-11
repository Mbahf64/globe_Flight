"use client"

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`,
        {
          params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
          },
        }
      );

      setSuggestions(response.data.features);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleSuggestionClick = (placeName) => {
    setQuery(placeName);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h3>Search for a location:</h3>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type a location"
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          marginTop: '0.5rem',
          padding: '0.5rem',
        }}
      >
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion.place_name)}
            style={{
              padding: '0.5rem',
              cursor: 'pointer',
            }}
          >
            {suggestion.place_name}
          </div>
        ))}
      </div>
    </div>
  );
}
