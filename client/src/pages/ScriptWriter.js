import React, { useState } from 'react';
import './ScriptWriter.css';

// This would be imported from your services folder in a real implementation
const mockApiCall = (prompt) => {
  // Mock API response - in a real app, this would call your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        suggestions: [
          "FADE IN:\nEXT. CITY STREET - NIGHT\nRain pours down as ALEX (30s) hurries under the dim streetlights, clutching a mysterious package.",
          "INT. LABORATORY - DAY\nDR. PARKER (50s) examines data on multiple screens, her face illuminated by blue light. Something in the results makes her gasp."
        ]
      });
    }, 1000);
  });
};

const ScriptWriter = () => {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSuggestions = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      // This would be a real API call in production
      const response = await mockApiCall(prompt);
      setSuggestions(response.suggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      // In a real app, you'd show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="scriptwriter" className="tool-section">
      <h2>AI Script Writer</h2>
      <p>Generate scripts based on your ideas or get help improving your existing screenplay.</p>
      
      <div className="script-editor">
        <textarea 
          placeholder="Enter your script or story idea here..." 
          rows="10"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <button 
          onClick={handleGenerateSuggestions}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Suggestions'}
        </button>
        
        {suggestions.length > 0 && (
          <div className="suggestions-container">
            <h3>AI Suggestions</h3>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion">
                <pre>{suggestion}</pre>
                <button className="use-suggestion">Use This</button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 
      TODO: Expand this component to include:
      1. A full screenplay formatter with proper scene headings, action, characters, etc.
      2. Save/load functionality to store scripts in progress
      3. Export options for various screenplay formats
      4. More advanced AI integration with specific prompts for different purposes:
         - Generate a new scene
         - Suggest dialogue for a character
         - Help with plot development
         - etc.
      */}
    </section>
  );
};

export default ScriptWriter;