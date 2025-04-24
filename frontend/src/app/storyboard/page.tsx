// frontend/src/app/storyboard/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardContent } from '../../components/ui/card';

// Define types for our storyboard data
type StoryboardFrame = {
  scene_number: number;
  image_url: string;
  description: string;
};

// Define storyboard styles
type StoryboardStyle = {
  id: string;
  name: string;
  description: string;
};

const storyboardStyles: StoryboardStyle[] = [
  {
    id: 'traditional',
    name: 'Traditional Storyboard',
    description: 'Classic hand-drawn style with clear composition and framing'
  },
  {
    id: 'noir',
    name: 'Film Noir',
    description: 'High contrast black and white with dramatic shadows'
  },
  {
    id: 'colorScript',
    name: 'Color Script',
    description: 'Emphasis on color palette and mood'
  },
  {
    id: 'animatic',
    name: 'Animatic Style',
    description: 'Simplified, animation-ready illustrations'
  },
  {
    id: 'conceptArt',
    name: 'Concept Art',
    description: 'Detailed, artistic renderings with atmospheric elements'
  }
];

export default function Storyboard() {
  // State variables
  const [scriptContent, setScriptContent] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('traditional');
  const [storyboardFrames, setStoryboardFrames] = useState<StoryboardFrame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!scriptContent.trim()) {
      setError('Please enter a script or scene description');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Call the backend API
      const response = await fetch('http://localhost:5000/api/storyboard/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: scriptContent,
          num_images: numImages,
          style: selectedStyle
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate storyboard');
      }
      
      const data = await response.json();
      setStoryboardFrames(data.storyboard);
    } catch (error) {
      console.error('Error generating storyboard:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI Storyboard Generator</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Generate Your Storyboard</h2>
          <p className="text-gray-600">Enter a scene description or script excerpt to generate images</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="script" className="block mb-2 font-medium">
                Scene Description or Script:
              </label>
              <textarea
                id="script"
                className="w-full p-3 border rounded-md h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                placeholder="INT. COFFEE SHOP - DAY&#10;&#10;ALEX sits alone at a table, nervously checking their watch..."
                required
              />
            </div>
            
            <div>
              <label htmlFor="numImages" className="block mb-2 font-medium">
                Number of Images to Generate (1-5):
              </label>
              <input
                id="numImages"
                type="number"
                min="1"
                max="5"
                className="w-full md:w-1/4 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={numImages}
                onChange={(e) => setNumImages(parseInt(e.target.value))}
              />
              <p className="mt-1 text-sm text-gray-500">
                Note: Generating more images will take longer
              </p>
            </div>
            
            <div>
              <label htmlFor="storyboardStyle" className="block mb-2 font-medium">
                Storyboard Style:
              </label>
              <select
                id="storyboardStyle"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                {storyboardStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                {storyboardStyles.find(style => style.id === selectedStyle)?.description}
              </p>
            </div>
            
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isLoading || !scriptContent.trim()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {isLoading ? 'Generating...' : 'Generate Storyboard'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-lg text-gray-700">Generating your storyboard images...</p>
          <p className="text-sm text-gray-500">This may take a minute or two</p>
        </div>
      )}
      
      {storyboardFrames.length > 0 && !isLoading && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Storyboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyboardFrames.map((frame) => (
              <div key={frame.scene_number} className="border rounded-lg overflow-hidden shadow-md">
                <img 
                  src={frame.image_url} 
                  alt={`Scene ${frame.scene_number}`} 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-2">Scene {frame.scene_number}</h3>
                  <p className="text-sm text-gray-700">{frame.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}