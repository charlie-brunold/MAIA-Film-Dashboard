// frontend/src/app/scriptwriter/page.tsx
'use client';

import { useState } from 'react';

export default function ScriptWriter() {
  const [prompt, setPrompt] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/scriptwriter/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      setGeneratedScript(data.script);
    } catch (error) {
      console.error('Error generating script:', error);
      setGeneratedScript('Error generating script. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI Script Writer</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Generate script content by describing your scene, characters, or plot points.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block mb-2 font-medium">
              Describe your scene or provide a prompt:
            </label>
            <textarea
              id="prompt"
              className="w-full p-3 border rounded-md h-32"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., A tense confrontation between two friends who discover they've been dating the same person..."
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Generating...' : 'Generate Script'}
          </button>
        </form>
      </div>
      
      {generatedScript && (
        <div className="border p-4 rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Generated Script:</h2>
          <div className="whitespace-pre-line font-mono">{generatedScript}</div>
        </div>
      )}
    </div>
  );
}