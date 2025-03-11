// frontend/src/app/storyboard/page.tsx
'use client';

import { useState } from 'react';

export default function Storyboard() {
  const [scriptContent, setScriptContent] = useState('');
  const [storyboardImages, setStoryboardImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/storyboard/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script: scriptContent }),
      });
      
      const data = await response.json();
      // In a real implementation, these would be actual image URLs
      setStoryboardImages([
        'https://via.placeholder.com/400x300?text=Scene+1',
        'https://via.placeholder.com/400x300?text=Scene+2',
        'https://via.placeholder.com/400x300?text=Scene+3',
      ]);
    } catch (error) {
      console.error('Error generating storyboard:', error);
      alert('Error generating storyboard. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI Storyboard Generator</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Convert your script into visual storyboards to help plan your shots.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="script" className="block mb-2 font-medium">
              Paste your script or scene description:
            </label>
            <textarea
              id="script"
              className="w-full p-3 border rounded-md h-32"
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
              placeholder="INT. COFFEE SHOP - DAY&#10;&#10;ALEX sits alone at a table, nervously checking their watch..."
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !scriptContent.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Generating...' : 'Generate Storyboard'}
          </button>
        </form>
      </div>
      
      {storyboardImages.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Generated Storyboard:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storyboardImages.map((src, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                <img src={src} alt={`Scene ${index + 1}`} className="w-full h-auto" />
                <div className="p-2 bg-gray-50">
                  <p className="font-medium">Scene {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}