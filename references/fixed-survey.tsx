import React, { useState } from 'react';

function PostSignupSurvey() {
  // Track current step in the survey
  const [currentStep, setCurrentStep] = useState(0);
  
  // Store user responses
  const [responses, setResponses] = useState({
    filmGenre: '',
    experience: '',
    budget: '',
    primaryGoal: '',
    preferred_tools: []
  });

  // Define all survey steps
  const surveySteps = [
    {
      id: 'welcome',
      title: 'Welcome to MAIA Film Dashboard!',
      description: 'Let\'s customize your experience. Tell us a bit about your filmmaking interests.',
      type: 'info'
    },
    {
      id: 'filmGenre',
      title: 'What genre of film are you interested in creating?',
      type: 'single-select',
      options: [
        { id: 'drama', label: 'Drama' },
        { id: 'comedy', label: 'Comedy' },
        { id: 'documentary', label: 'Documentary' },
        { id: 'scifi', label: 'Science Fiction' },
        { id: 'horror', label: 'Horror' },
        { id: 'action', label: 'Action' },
        { id: 'thriller', label: 'Thriller' },
        { id: 'romance', label: 'Romance' },
        { id: 'animation', label: 'Animation' },
        { id: 'other', label: 'Other / Multiple genres' }
      ]
    },
    {
      id: 'experience',
      title: 'What is your level of filmmaking experience?',
      type: 'single-select',
      options: [
        { id: 'beginner', label: 'Beginner - Just starting out' },
        { id: 'intermediate', label: 'Intermediate - Made a few projects' },
        { id: 'advanced', label: 'Advanced - Experienced filmmaker' },
        { id: 'professional', label: 'Professional - This is my career' }
      ]
    },
    {
      id: 'budget',
      title: 'What is your typical project budget range?',
      type: 'single-select',
      options: [
        { id: 'micro', label: 'Micro-budget ($0-1,000)' },
        { id: 'low', label: 'Low-budget ($1,000-10,000)' },
        { id: 'medium', label: 'Medium-budget ($10,000-100,000)' },
        { id: 'high', label: 'High-budget ($100,000+)' },
        { id: 'varying', label: 'Varies by project' }
      ]
    },
    {
      id: 'primaryGoal',
      title: 'What is your primary goal with your next film project?',
      type: 'single-select',
      options: [
        { id: 'portfolio', label: 'Build my portfolio' },
        { id: 'festivals', label: 'Submit to festivals' },
        { id: 'online', label: 'Share online (YouTube, Vimeo, etc.)' },
        { id: 'commercial', label: 'Commercial distribution' },
        { id: 'personal', label: 'Personal project / Learning experience' },
        { id: 'client', label: 'Client work' }
      ]
    },
    {
      id: 'preferred_tools',
      title: 'Which tools are you most interested in using?',
      type: 'multi-select',
      options: [
        { id: 'scriptwriter', label: 'AI Script Writer', icon: 'pencil' },
        { id: 'storyboard', label: 'Storyboard Generator', icon: 'image' },
        { id: 'budget', label: 'Budget Calculator', icon: 'calculator' },
        { id: 'roi', label: 'ROI Analysis', icon: 'chart' }
      ]
    },
    {
      id: 'complete',
      title: 'All set!',
      description: 'Thanks for sharing your preferences. We\'ve customized your dashboard based on your responses.',
      type: 'info'
    }
  ];

  // Get current step data
  const currentStepData = surveySteps[currentStep];

  // Handle option selection
  const handleSelect = (questionId, value, isMulti = false) => {
    if (isMulti) {
      // For multi-select questions
      const updatedValues = responses[questionId]?.includes(value)
        ? responses[questionId].filter(item => item !== value)
        : [...(responses[questionId] || []), value];
      
      setResponses({
        ...responses,
        [questionId]: updatedValues
      });
    } else {
      // For single-select questions
      setResponses({
        ...responses,
        [questionId]: value
      });
    }
  };

  // Handle navigation between steps
  const handleNext = () => {
    if (currentStep < surveySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit survey (in a real app, you would send data to the server here)
      console.log('Survey completed', responses);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if current step has a valid selection to enable Next button
  const isNextEnabled = () => {
    if (currentStepData.type === 'info') return true;
    if (currentStepData.type === 'multi-select') return true; // Multi-select can be empty
    return !!responses[currentStepData.id]; // Single-select needs a value
  };

  // Convert step index to percentage for progress bar
  const progressPercentage = ((currentStep) / (surveySteps.length - 1)) * 100;

  // Icons for the multi-select options
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'pencil':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'calculator':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Creative background elements - similar to signup page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Film strip element */}
        <div className="absolute -top-16 -right-16 w-64 h-96 border-8 border-indigo-900/10 border-dashed rounded-3xl transform rotate-12"></div>
        <div className="absolute top-1/4 -left-16 w-64 h-96 border-8 border-yellow-500/10 border-dashed rounded-3xl transform -rotate-12"></div>
        
        {/* Camera frames */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border-8 border-indigo-600/20 rounded-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border-8 border-purple-600/20 rounded-full"></div>
        
        {/* Script elements */}
        <div className="absolute top-20 left-20 w-48 h-6 bg-gray-300/30 rounded"></div>
        <div className="absolute top-32 left-20 w-36 h-6 bg-gray-300/30 rounded"></div>
        <div className="absolute top-44 left-20 w-56 h-6 bg-gray-300/30 rounded"></div>
        
        {/* Storyboard frames */}
        <div className="absolute bottom-32 right-32 grid grid-cols-2 gap-4">
          <div className="w-16 h-12 bg-gray-300/30 rounded"></div>
          <div className="w-16 h-12 bg-gray-300/30 rounded"></div>
          <div className="w-16 h-12 bg-gray-300/30 rounded"></div>
          <div className="w-16 h-12 bg-gray-300/30 rounded"></div>
        </div>
        
        {/* Colorful blobs */}
        <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-indigo-500/10 filter blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-purple-500/10 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 filter blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">MAIA</div>
              <div className="ml-2 text-sm text-gray-600">Film Dashboard</div>
            </div>
            <div className="text-sm text-gray-500">
              Customize your experience
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 md:py-12">
        <div className="max-w-lg w-full space-y-8 relative z-10">
          {/* Progress bar */}
          <div className="mb-2">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300 ease-in-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Start</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Survey Card */}
          <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100 transition-all duration-300 ease-in-out">
            {/* Step Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentStepData.title}
            </h2>

            {/* Step Description (for info steps) */}
            {currentStepData.type === 'info' && (
              <p className="text-gray-600 mb-8">
                {currentStepData.description}
              </p>
            )}

            {/* Options - Single Select */}
            {currentStepData.type === 'single-select' && (
              <div className="space-y-3 mb-8">
                {currentStepData.options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(currentStepData.id, option.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200
                      ${responses[currentStepData.id] === option.id
                        ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 flex-shrink-0 rounded-full border
                        ${responses[currentStepData.id] === option.id
                          ? 'bg-indigo-600 border-indigo-600'
                          : 'border-gray-300'
                        }`}
                      >
                        {responses[currentStepData.id] === option.id && (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="ml-3 font-medium text-gray-900">{option.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Options - Multi Select */}
            {currentStepData.type === 'multi-select' && (
              <div className="space-y-3 mb-8">
                {currentStepData.options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(currentStepData.id, option.id, true)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200
                      ${responses[currentStepData.id]?.includes(option.id)
                        ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 flex-shrink-0 rounded-md border
                        ${responses[currentStepData.id]?.includes(option.id)
                          ? 'bg-indigo-600 border-indigo-600'
                          : 'border-gray-300'
                        }`}
                      >
                        {responses[currentStepData.id]?.includes(option.id) && (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3 flex items-center">
                        {option.icon && (
                          <div className="mr-3 text-indigo-500">
                            {getIcon(option.icon)}
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{option.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* First step animation */}
            {currentStep === 0 && (
              <div className="flex justify-center my-8">
                <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Last step animation */}
            {currentStep === surveySteps.length - 1 && (
              <div className="flex justify-center my-8">
                <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium
                  ${currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {currentStep === 0 ? '' : 'Back'}
              </button>
              <button
                onClick={handleNext}
                disabled={!isNextEnabled()}
                className={`px-4 py-2 rounded-md text-sm font-medium 
                  ${!isNextEnabled()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
              >
                {currentStep === surveySteps.length - 1 ? 'Go to Dashboard' : 'Next'}
              </button>
            </div>
          </div>

          {/* Skip survey link */}
          {currentStep !== surveySteps.length - 1 && (
            <div className="text-center">
              <button 
                onClick={() => setCurrentStep(surveySteps.length - 1)}
                className="text-sm text-gray-500 hover:text-indigo-600"
              >
                Skip survey and continue to dashboard
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default PostSignupSurvey;
