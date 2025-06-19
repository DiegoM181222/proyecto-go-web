import React from 'react';

interface HomePageProps {
  onSectionChange: (section: string) => void;
}

export default function HomePage({ onSectionChange }: HomePageProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-300 rounded-full opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-gray-200 rounded-full opacity-40"></div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-3 z-10">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-3 h-3 rounded-full ${dot === 1 ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>

      {/* Navigation Dots Bottom Right */}
      <div className="absolute right-8 bottom-8 flex space-x-3 z-10">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-3 h-3 rounded-full ${dot === 1 ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block bg-white px-6 py-3 rounded-full shadow-sm">
                <span className="text-lg font-semibold text-gray-900">Bienvenido a</span>
              </div>
              <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                Go<br />Web
              </h1>
              <p className="text-xl text-gray-700 font-medium">
                Creación y Diseño de Páginas Web
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onSectionChange('services')}
                className="bg-gray-200 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-300 transition-colors"
              >
                Ver Servicios
              </button>
              <button
                onClick={() => onSectionChange('contact')}
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Cotizar Proyecto
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main circular frame */}
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
                <div className="absolute inset-4 bg-white rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Small logo circle */}
              <div className="absolute -bottom-8 left-8 w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-lg">GW</span>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -inset-20 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 border-4 border-gray-400 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom Website URL */}
        <div className="mt-20">
          <p className="text-gray-600 font-medium">www.GoWeb.com</p>
        </div>
      </div>
    </div>
  );
}