import React from 'react';

export default function PortfolioPage() {
  const projects = [
    {
      title: 'Tienda de Ropa Online',
      subtitle: 'Ecommerce para marca de moda local',
      image: 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg',
      tags: ['React', 'Tailwind', 'Ecommerce'],
      description: 'Plataforma completa de comercio electrónico con catálogo de productos, carrito de compras y pasarela de pagos integrada.'
    },
    {
      title: 'Blog Gastronómico',
      subtitle: 'Sitio web para chef profesional',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      tags: ['Next.js', 'SEO', 'Blog'],
      description: 'Blog profesional con sistema de gestión de contenido, recetas interactivas y optimización SEO completa.'
    },
    {
      title: 'Plataforma de Cursos',
      subtitle: 'Web educativa con sistema de inscripción',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      tags: ['React', 'Firebase', 'Educación'],
      description: 'Sistema completo de gestión de aprendizaje con inscripciones, seguimiento de progreso y certificados.'
    }
  ];

  return (
    <div className="relative overflow-hidden py-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-300 rounded-full opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400 rounded-full opacity-30"></div>
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

      {/* Navigation Dots Bottom Right */}
      <div className="absolute right-8 bottom-8 flex space-x-3 z-10">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-3 h-3 rounded-full ${dot === 4 ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Portafolio</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.subtitle}
                </p>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Website URL */}
        <div className="mt-20">
          <p className="text-gray-600 font-medium">www.GoWeb.com</p>
        </div>
      </div>
    </div>
  );
}