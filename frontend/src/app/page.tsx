// frontend/src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="section text-center max-w-4xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
          <span className="block">MAIA Film Dashboard</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A comprehensive toolkit for filmmakers to streamline the creative process
        </p>
        <div className="mt-8 flex justify-center gap-x-4">
          <Link href="/scriptwriter" className="btn-primary">
            Get Started
          </Link>
          <Link href="#features" className="btn-secondary">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section mt-16">
        <h2 className="text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6 h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="mb-2">Script Writer</h3>
            <p className="text-gray-600 mb-4">Generate and refine scripts with AI assistance</p>
            <Link href="/scriptwriter" className="text-primary-600 hover:text-primary-800 font-medium">
              Try it out →
            </Link>
          </div>

          <div className="card p-6 h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mb-2">Storyboard Generator</h3>
            <p className="text-gray-600 mb-4">Visualize your script with AI-generated storyboards</p>
            <Link href="/storyboard" className="text-primary-600 hover:text-primary-800 font-medium">
              Try it out →
            </Link>
          </div>

          <div className="card p-6 h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2">Budget Calculator</h3>
            <p className="text-gray-600 mb-4">Plan and estimate your film's budget with precision</p>
            <Link href="/budget" className="text-primary-600 hover:text-primary-800 font-medium">
              Try it out →
            </Link>
          </div>

          <div className="card p-6 h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="mb-2">ROI Analysis</h3>
            <p className="text-gray-600 mb-4">Predict success and analyze return on investment</p>
            <Link href="/analysis" className="text-primary-600 hover:text-primary-800 font-medium">
              Try it out →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section mt-16">
        <div className="bg-primary-600 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Transform Your Filmmaking Process
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-100 max-w-2xl mx-auto">
              Join innovative filmmakers using MAIA to streamline their creative process, reduce costs, and create compelling content.
            </p>
            <div className="mt-8">
              <Link href="/scriptwriter" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}