import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-blue-600 h-screen">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Cyberbullying Prevention"
        />
        <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-80"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Stop Cyberbullying</h1>
        <p className="mt-6 text-xl text-blue-100 max-w-3xl">
          Together we can create a safer digital world. Get immediate support through our AI companion Billy,
          connect with others, and learn how to protect yourself online.
        </p>
        <div className="mt-10 flex space-x-4">
          <a
            href="/chat"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
          >
            Chat with Billy
          </a>
          <a
            href="/take-action"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
          >
            Take Action
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;