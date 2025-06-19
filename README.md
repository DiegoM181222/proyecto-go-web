# GoWeb - Sitio Web Corporativo

## Descripción
GoWeb es un sitio web corporativo moderno para una agencia de desarrollo web. Incluye un sistema de autenticación completo y múltiples secciones informativas.

## Características
- Sistema de autenticación con roles (Admin/Usuario)
- Diseño responsive y moderno
- Múltiples secciones: Inicio, Servicios, Mantenimiento, Portafolio, Sobre nosotros, Contacto
- Formularios funcionales
- Animaciones suaves
- Compatible con XAMPP/Localhost

## Instalación en XAMPP

1. **Descargar e instalar XAMPP**
   - Descarga XAMPP desde: https://www.apachefriends.org/
   - Instala XAMPP en tu sistema

2. **Configurar el proyecto**
   - Copia todos los archivos del proyecto a la carpeta `htdocs` de XAMPP
   - Ruta típica: `C:\xampp\htdocs\goweb\` (Windows) o `/Applications/XAMPP/htdocs/goweb/` (Mac)

3. **Iniciar XAMPP**
   - Abre el Panel de Control de XAMPP
   - Inicia el servicio "Apache"

4. **Acceder al sitio**
   - Abre tu navegador web
   - Ve a: `http://localhost/goweb/`

## Cuentas de Prueba

### Administrador
- **Email:** admin@goweb.com
- **Contraseña:** admin123
- **Tipo:** Admin

### Usuario Regular
- **Email:** user@goweb.com
- **Contraseña:** user123
- **Tipo:** Usuario

## Estructura del Proyecto

```
goweb/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── script.js       # JavaScript funcional
└── README.md           # Este archivo
```

## Funcionalidades

### Sistema de Autenticación
- Login con email y contraseña
- Selección de tipo de usuario (Admin/Usuario)
- Validación de credenciales
- Sesión persistente durante la navegación

### Secciones del Sitio
1. **Inicio** - Página principal con hero section
2. **Servicios** - Paquetes de servicios con precios
3. **Mantenimiento** - Formulario de solicitud de mantenimiento
4. **Portafolio** - Showcase de proyectos realizados
5. **Sobre nosotros** - Información del equipo
6. **Contacto** - Formulario de contacto completo

### Características Técnicas
- HTML5 semántico
- CSS3 con Flexbox y Grid
- JavaScript vanilla (ES6+)
- Diseño responsive
- Animaciones CSS
- Font Awesome para iconos

## Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #20b2aa;
    --dark-color: #333;
}
```

### Agregar Usuarios
Modifica el array `users` en `js/script.js`:
```javascript
this.users = [
    { id: '3', email: 'nuevo@email.com', password: 'password', name: 'Nuevo Usuario', role: 'user' }
];
```

### Cambiar Contenido
Edita directamente el HTML en `index.html` para modificar textos, imágenes y contenido.

## Soporte

Para soporte técnico o consultas:
- Email: contacto@goweb.com
- Teléfono: +1 (555) 123-4567

## Licencia

Este proyecto es de uso libre para fines educativos y comerciales.