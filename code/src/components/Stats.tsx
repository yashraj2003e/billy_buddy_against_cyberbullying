import React from 'react';
import { Users, MessageSquare, Shield, Activity } from 'lucide-react';

const Stats = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <p className="mt-4 text-5xl font-extrabold text-blue-600">60%</p>
            <p className="mt-2 text-lg text-gray-600">of teens have experienced cyberbullying</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <MessageSquare className="h-12 w-12 text-blue-600" />
            </div>
            <p className="mt-4 text-5xl font-extrabold text-blue-600">24/7</p>
            <p className="mt-2 text-lg text-gray-600">support through Billy chatbot</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <p className="mt-4 text-5xl font-extrabold text-blue-600">100%</p>
            <p className="mt-2 text-lg text-gray-600">anonymous reporting</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Activity className="h-12 w-12 text-blue-600" />
            </div>
            <p className="mt-4 text-5xl font-extrabold text-blue-600">5K+</p>
            <p className="mt-2 text-lg text-gray-600">cases resolved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;