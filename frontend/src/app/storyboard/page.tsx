// frontend/src/app/storyboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';

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
  const [animateIn, setAnimateIn] = useState(false);

  // Animation effect on load
  useEffect(() => {
    setAnimateIn(true);
  }, []);

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
    <div className={`max-w-6xl mx-auto transition-opacity duration-700 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-wider">STORYBOARD GENERATOR</h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Turn your script into professional storyboard frames with AI-powered visual storytelling
        </p>
      </div>
      
      <div className="bg-black bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl p-6 mb-12 border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="script" className="block mb-2 font-mono uppercase text-robins-red-500 tracking-wider text-sm">
              Scene Description or Script
            </label>
            <textarea
              id="script"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md text-white h-40 focus:ring-2 focus:ring-robins-red-500 focus:border-robins-red-500"
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
              placeholder="INT. COFFEE SHOP - DAY&#10;&#10;ALEX sits alone at a table, nervously checking their watch..."
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="numImages" className="block mb-2 font-mono uppercase text-robins-red-500 tracking-wider text-sm">
                Number of Images (1-5)
              </label>
              <input
                id="numImages"
                type="number"
                min="1"
                max="5"
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-robins-red-500 focus:border-robins-red-500"
                value={numImages}
                onChange={(e) => setNumImages(parseInt(e.target.value))}
              />
              <p className="mt-1 text-sm text-gray-400">
                More images will take longer to generate
              </p>
            </div>
            
            <div>
              <label htmlFor="storyboardStyle" className="block mb-2 font-mono uppercase text-robins-red-500 tracking-wider text-sm">
                Visual Style
              </label>
              <select
                id="storyboardStyle"
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-robins-red-500 focus:border-robins-red-500"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                {storyboardStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-400">
                {storyboardStyles.find(style => style.id === selectedStyle)?.description}
              </p>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-900 border border-red-700 text-white rounded-md">
              {error}
            </div>
          )}
          
          <Button
            type="submit"
            disabled={isLoading || !scriptContent.trim()}
            className="w-full py-3 bg-robins-red-600 text-white rounded-md hover:bg-robins-red-700 transition-colors font-medium tracking-wider uppercase"
          >
            {isLoading ? 'Generating...' : 'Generate Storyboard'}
          </Button>
        </form>
      </div>
      
      {isLoading && (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-robins-red-500"></div>
          <p className="mt-6 text-xl text-white">Creating Your Vision</p>
          <p className="text-gray-400">This may take a minute or two</p>
        </div>
      )}
      
      {storyboardFrames.length > 0 && !isLoading && (
        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-wider">YOUR STORYBOARD</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storyboardFrames.map((frame, index) => (
              <div 
                key={frame.scene_number} 
                className="bg-black bg-opacity-60 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <div className="relative">
                  <img 
                    src={frame.image_url} 
                    alt={`Scene ${frame.scene_number}`} 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-md text-sm font-mono">
                    SCENE {frame.scene_number}
                  </div>
                </div>
                <div className="p-4 text-white">
                  <p className="text-sm text-gray-300 font-mono border-l-2 border-robins-red-500 pl-3">
                    {frame.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-2 rounded-md"
            >
              Generate Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}