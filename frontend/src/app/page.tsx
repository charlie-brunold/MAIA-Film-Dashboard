// frontend/src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">MAIA Film Dashboard</h1>
        
        <p className="text-lg mb-8 text-center">
          A comprehensive toolkit for filmmakers to streamline the creative process
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            title="Script Writer" 
            description="Generate and refine scripts with AI assistance"
            link="/scriptwriter"
          />
          <FeatureCard 
            title="Storyboard Generator" 
            description="Visualize your script with AI-generated storyboards"
            link="/storyboard"
          />
          <FeatureCard 
            title="Budget Calculator" 
            description="Plan and estimate your film's budget"
            link="/budget"
          />
          <FeatureCard 
            title="ROI Analysis" 
            description="Predict success and analyze return on investment"
            link="/analysis"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link} className="block">
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}