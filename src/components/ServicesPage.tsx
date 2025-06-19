import React from 'react';

export default function ServicesPage() {
  const services = [
    {
      name: 'Paquete Básico',
      color: 'bg-teal-600',
      title: 'Landing Page',
      description: 'Sitio web de una página optimizado para conversión',
      price: '$140/Mes',
      features: [
        'Diseño responsive',
        'Optimización SEO básica',
        'Formulario de contacto',
        'Hosting incluido',
        'SSL Certificate'
      ]
    },
    {
      name: 'Paquete Oro',
      color: 'bg-teal-600',
      title: 'Web Corporativa',
      description: 'Sitio web profesional con múltiples secciones',
      price: '$240/Mes',
      features: [
        'Multi-página',
        'Panel de administración',
        'Blog integrado',
        'Analytics avanzados',
        'Soporte prioritario'
      ]
    },
    {
      name: 'Paquete Experto',
      color: 'bg-gray-800',
      textColor: 'text-white',
      title: 'Tienda Online',
      description: 'Ecommerce completo con pasarela de pagos',
      price: '$350/Mes',
      priceColor: 'text-teal-400',
      features: [
        'Catálogo de productos',
        'Carrito de compras',
        'Pasarelas de pago',
        'Gestión de inventario',
        'Reportes de ventas'
      ]
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
            className={`w-3 h-3 rounded-full ${dot === 2 ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Nuestros Servicios</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.color} rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="bg-white rounded-2xl p-6 mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${service.color.replace('bg-', 'text-')}`}>
                  {service.name}
                </h3>
              </div>

              <div className={`text-center space-y-4 ${service.textColor || 'text-white'}`}>
                <h4 className="text-xl font-bold">{service.title}</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="py-6">
                  <div className="w-full h-px bg-white opacity-30 mb-4"></div>
                  <div className="w-full h-px bg-white opacity-30"></div>
                </div>

                <div className={`text-3xl font-bold ${service.priceColor || 'text-white'}`}>
                  {service.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}