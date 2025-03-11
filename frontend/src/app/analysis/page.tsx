// frontend/src/app/analysis/page.tsx
'use client';

import { useState } from 'react';

type FilmDetails = {
  title: string;
  genre: string;
  budget: number;
  castRating: number;
  runtime: number;
  releaseMonth: string;
  marketingBudget: number;
};

export default function Analysis() {
  const [filmDetails, setFilmDetails] = useState<FilmDetails>({
    title: '',
    genre: 'Drama',
    budget: 1000000,
    castRating: 7,
    runtime: 120,
    releaseMonth: 'June',
    marketingBudget: 500000
  });
  
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const genres = ['Drama', 'Comedy', 'Action', 'Thriller', 'Horror', 'Sci-Fi', 'Romance', 'Documentary'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/analysis/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filmDetails),
      });
      
      const data = await response.json();
      setPrediction({
        predictedRevenue: 2500000,
        roi: 67,
        successProbability: 72,
        recommendations: [
          "Consider increasing marketing budget by 20% for better returns",
          "This genre performs well in summer months",
          "Films with similar characteristics have average audience rating of 7.4/10"
        ]
      });
    } catch (error) {
      console.error('Error predicting ROI:', error);
      alert('Error predicting ROI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilmDetails({
      ...filmDetails,
      [name]: name === 'budget' || name === 'marketingBudget' || name === 'castRating' || name === 'runtime' 
        ? parseFloat(value) 
        : value
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Film ROI Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">Film Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1">Film Title:</label>
              <input
                id="title"
                name="title"
                type="text"
                className="w-full p-2 border rounded-md"
                value={filmDetails.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="genre" className="block mb-1">Genre:</label>
              <select
                id="genre"
                name="genre"
                className="w-full p-2 border rounded-md"
                value={filmDetails.genre}
                onChange={handleInputChange}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="budget" className="block mb-1">Production Budget ($):</label>
              <input
                id="budget"
                name="budget"
                type="number"
                className="w-full p-2 border rounded-md"
                value={filmDetails.budget}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            
            <div>
              <label htmlFor="marketingBudget" className="block mb-1">Marketing Budget ($):</label>
              <input
                id="marketingBudget"
                name="marketingBudget"
                type="number"
                className="w-full p-2 border rounded-md"
                value={filmDetails.marketingBudget}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            
            <div>
              <label htmlFor="castRating" className="block mb-1">Cast Star Power (1-10):</label>
              <input
                id="castRating"
                name="castRating"
                type="range"
                min="1"
                max="10"
                step="0.1"
                className="w-full"
                value={filmDetails.castRating}
                onChange={handleInputChange}
              />
              <div className="text-center">{filmDetails.castRating}</div>
            </div>
            
            <div>
              <label htmlFor="runtime" className="block mb-1">Runtime (minutes):</label>
              <input
                id="runtime"
                name="runtime"
                type="number"
                className="w-full p-2 border rounded-md"
                value={filmDetails.runtime}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            
            <div>
              <label htmlFor="releaseMonth" className="block mb-1">Release Month:</label>
              <select
                id="releaseMonth"
                name="releaseMonth"
                className="w-full p-2 border rounded-md"
                value={filmDetails.releaseMonth}
                onChange={handleInputChange}
              >
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !filmDetails.title}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Analyzing...' : 'Analyze ROI'}
            </button>
          </form>
        </div>
        
        <div>
          {prediction ? (
            <div className="border rounded-md p-6">
              <h2 className="text-xl font-semibold mb-4">ROI Analysis Results</h2>
              
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Predicted Revenue</p>
                  <p className="text-2xl font-bold">${prediction.predictedRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expected ROI</p>
                  <p className="text-2xl font-bold">{prediction.roi}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Success Probability</p>
                  <p className="text-2xl font-bold">{prediction.successProbability}%</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Recommendations:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {prediction.recommendations.map((rec: string, index: number) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p className="text-center">Fill out the film details and click "Analyze ROI" to see predictions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}