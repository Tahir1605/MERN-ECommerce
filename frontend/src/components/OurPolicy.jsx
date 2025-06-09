import React from 'react';
import { Repeat, RotateCcw, Headset } from 'lucide-react'; // Lucide icons

function OurPolicy() {
  const policies = [
    {
      icon: <Repeat className="w-8 h-8 text-white" />,
      title: 'Easy Exchange Policy',
      description: 'Hassle-free exchange within a few simple steps.',
      bg: 'bg-blue-500',
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-white" />,
      title: '7 Days Return Policy',
      description: 'Return the product within 7 days with full refund.',
      bg: 'bg-green-500',
    },
    {
      icon: <Headset className="w-8 h-8 text-white" />,
      title: 'Best Customer Support',
      description: '24/7 dedicated support for all your needs.',
      bg: 'bg-rose-500',
    },
  ];

  return (
    <div className="my-12 px-4 sm:px-6 lg:px-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Our Policy</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 border rounded-2xl shadow hover:shadow-lg transition duration-300 bg-white"
          >
            <div className={`p-4 rounded-full mb-4 ${policy.bg}`}>
              {policy.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
            <p className="text-gray-600 text-sm">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurPolicy;
