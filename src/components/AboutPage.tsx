import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'Gomez Bobadilla, Sergio Oscar',
      role: 'Fundador & CEO',
      description: 'Apasionado por la tecnología con 10 años de experiencia en desarrollo web.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Rivas, Sergio',
      role: 'Director Creativo',
      description: 'Experto en diseño UX/UI con un enfoque en crear experiencias digitales únicas.',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Mendoza, Diego',
      role: 'Desarrolladora Senior',
      description: 'Especialista en desarrollo frontend con pasión por crear webs de alto rendimiento.',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  return (
    <div className="relative overflow-hidden py-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-300 rounded-full opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400 rounded-full opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-200 rounded-full opacity-40"></div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-3 z-10">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-3 h-3 rounded-full ${dot === 4 ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-8">Sobre Nosotros</h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Somos un equipo de profesionales apasionados por transformar ideas digitales en realidades 
            web. Nuestra misión es crear soluciones digitales que impulsen el éxito de tu negocio.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-gray-600 font-medium mb-4">
                  {member.role}
                </p>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {member.description}
                </p>
                
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors flex items-center gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href={member.social.twitter}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors flex items-center gap-2"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}