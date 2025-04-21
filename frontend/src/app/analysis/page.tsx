// frontend/src/app/analysis/page.tsx
'use client';

import { useState } from 'react';

const GENRES = [
  'Action','Adventure','Animation','Comedy','Crime','Documentary',
  'Drama','Family','Fantasy','History','Horror','Mystery',
  'Romance','Science Fiction','Thriller','War','Western'
];

// Slider reference points for Expected Interest
const INTEREST_REFERENCES = [
  { value: 0,  label: 'No buzz' },
  { value: 5,  label: 'Niche/Art-house' },
  { value: 10, label: 'Moderate interest' },
  { value: 15, label: 'High interest' },
  { value: 20, label: 'Blockbuster-level buzz' },
];

type FilmInput = {
  budget: number;
  runtime: number;
  release_month: number;
  release_year: number;
  main_genre: string;
  original_language: string;
  interest: number;      // maps to popularity
  crew_count: number;
  cast_count: number;
};

type Prediction = {
  predictedRevenue: number;
  roi: number;
  recommendations: string[];
};

export default function Analysis() {
  const [film, setFilm] = useState<FilmInput>({
    budget:            1_000_000,
    runtime:           120,
    release_month:     6,
    release_year:      new Date().getFullYear(),
    main_genre:        'Drama',
    original_language: 'en',
    interest:          8,
    crew_count:        10,
    cast_count:        5
  });
  const [pred, setPred]     = useState<Prediction|null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFilm(f => ({
      ...f,
      [name]: ['budget','runtime','release_month','release_year','interest','crew_count','cast_count']
        .includes(name)
          ? parseFloat(value)
          : value
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setPred(null);
    try {
      const res = await fetch(
        'http://localhost:5000/api/analysis/predict',
        {
          method: 'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            budget:            film.budget,
            runtime:           film.runtime,
            release_month:     film.release_month,
            release_year:      film.release_year,
            genres:            [film.main_genre],
            original_language: film.original_language,
            popularity:        film.interest,
            crew_count:        film.crew_count,
            cast_count:        film.cast_count
          })
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setPred(await res.json());
    } catch(err:any) {
      alert('Prediction failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Film Revenue Predictor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="block">
          Budget ($)
          <input
            name="budget" type="number"
            min={0} value={film.budget}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block">
          Runtime (minutes)
          <input
            name="runtime" type="number"
            min={1} value={film.runtime}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 rounded"
            required
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            Release Month (1–12)
            <input
              name="release_month" type="number"
              min={1} max={12}
              value={film.release_month}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded"
              required
            />
          </label>
          <label className="block">
            Release Year
            <input
              name="release_year" type="number"
              min={1900} max={2100}
              value={film.release_year}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded"
              required
            />
          </label>
        </div>

        <label className="block">
          Main Genre
          <select
            name="main_genre" value={film.main_genre}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 rounded"
          >
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>

        <label className="block">
          Original Language (ISO)
          <input
            name="original_language"
            type="text"
            value={film.original_language}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 rounded"
            placeholder="e.g. en"
            required
          />
        </label>

        <label className="block">
          Expected Interest: <span className="font-bold">{film.interest.toFixed(1)}</span>
          <input
            name="interest" type="range"
            min={0} max={20} step={0.1}
            value={film.interest}
            onChange={handleChange}
            className="mt-1 block w-full"
          />
          <div className="text-sm text-gray-600 mt-1">
            {INTEREST_REFERENCES.map(({value,label},i)=>(
              <div key={i}>{value} → {label}</div>
            ))}
          </div>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            Crew Count
            <input
              name="crew_count" type="number"
              min={0} value={film.crew_count}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded"
            />
          </label>
          <label className="block">
            Cast Count
            <input
              name="cast_count" type="number"
              min={0} value={film.cast_count}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Predicting…' : 'Predict Revenue'}
        </button>
      </form>

      {pred && (
        <div className="mt-8 p-6 border rounded bg-green-50">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <p><strong>Revenue:</strong> ${pred.predictedRevenue.toLocaleString()}</p>
          <p><strong>ROI:</strong> {pred.roi.toFixed(1)}%</p>
          <h3 className="mt-4 font-semibold">Recommendations:</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {pred.recommendations.map((r,i)=><li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

