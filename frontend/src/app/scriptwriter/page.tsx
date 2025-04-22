'use client';

import { useState } from 'react';

export default function Scriptwriter() {
  const [requirements, setRequirements] = useState("");
  const [tone, setTone]                 = useState("dramatic");
  const [script, setScript]             = useState<string|null>(null);
  const [loading, setLoading]           = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setScript(null);

    try {
      const res = await fetch("http://localhost:5000/api/scriptwriter/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirements, tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setScript(data.script);
    } catch (err: any) {
      alert("Error generating script: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Scriptwriter</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Describe your script requirements:
          <textarea
            rows={6}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="e.g. A tense confrontation in a dystopian future…"
            required
          />
        </label>

        <label className="block">
          Tone / Style:
          <input
            type="text"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="dramatic, comedic, film noir…"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate Script"}
        </button>
      </form>

      {script && (
        <div className="mt-6 p-6 bg-gray-100 rounded whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-2">Generated Scene</h2>
          <div>{script}</div>
        </div>
      )}
    </div>
  );
}
