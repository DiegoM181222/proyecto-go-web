import React, { useState } from 'react';

export default function MaintenancePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    service: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');
    setFormData({ name: '', email: '', website: '', service: '', description: '' });
  };

  return (
    <div className="relative overflow-hidden py-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-gray-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gray-400 rounded-full opacity-30"></div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-3 z-10">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-3 h-3 rounded-full ${dot === 3 ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Servicios de<br />Mantenimiento
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Tu Nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Tu Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="url"
                  placeholder="URL de tu Sitio Web"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar un Servicio</option>
                  <option value="mantenimiento-basico">Mantenimiento Básico</option>
                  <option value="actualizacion-contenido">Actualización de Contenido</option>
                  <option value="optimizacion-seo">Optimización SEO</option>
                  <option value="seguridad">Seguridad y Backups</option>
                  <option value="migracion">Migración de Sitio</option>
                </select>
              </div>

              <div>
                <textarea
                  placeholder="Describe el problema o mejoras que necesites..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Solicitar Mantenimiento
              </button>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="w-96 h-96 mx-auto relative">
              <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
              <div className="absolute inset-4 bg-white rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                  alt="Professional support"
                  className="w-full h-full object-cover"
                />
              </div>
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