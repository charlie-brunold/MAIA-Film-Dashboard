// src/components/scriptwriter/ScriptWriterContent.tsx
'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/card';

export default function ScriptWriterContent() {
  const [prompt, setPrompt] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll simulate an API call
      setTimeout(() => {
        setGeneratedScript(`
INT. COFFEE SHOP - DAY

Two characters sit across from each other at a small table. The atmosphere is tense.

CHARACTER 1
(nervously)
I've been meaning to talk to you about something.

CHARACTER 2
(suspicious)
What's this about?

CHARACTER 1
It's about that screenplay we've been working on.
I think we need to take it in a different direction.

CHARACTER 2
(defensive)
Different how? We've been working on this for months!

Based on prompt: "${prompt}"
        `);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error generating script:', error);
      setGeneratedScript('Error generating script. Please try again.');
      setIsLoading(false);
    }
  };

  const scriptWritingTips = [
    "Be specific about characters, setting, and tone in your prompt",
    "Include key plot points you want to see in the script",
    "Specify genre for more tailored results",
    "Mention specific dialogue styles or character traits",
    "For complex scenes, break down the action step by step"
  ];

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Script Writer</h1>
        <p className="text-gray-600">Transform your ideas into professional screenplay format with AI assistance</p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Create Your Script</h2>
                <button
                  type="button"
                  onClick={() => setShowTips(!showTips)}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  {showTips ? 'Hide Tips' : 'Show Tips'}
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {showTips && (
                <div className="mb-6 p-4 bg-primary-50 rounded-md">
                  <h3 className="text-sm font-medium mb-2 text-primary-800">Writing Tips:</h3>
                  <ul className="text-sm space-y-1 text-gray-700">
                    {scriptWritingTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe your scene or provide a prompt:
                  </label>
                  <textarea
                    id="prompt"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-40"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., A tense confrontation between two friends who discover they've been dating the same person..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    isLoading={isLoading}
                  >
                    Generate Script
                  </Button>
                  
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setPrompt('')}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Features</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Industry-standard screenplay formatting</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Character dialogue generation</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Scene description and action lines</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customizable tone and style</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Export to PDF and other formats</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {generatedScript && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Generated Script</h2>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Copy
                </Button>
                <Button size="sm">
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm whitespace-pre-line">{generatedScript}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}