# GoWeb - Sitio Web Estático

## Descripción
GoWeb es un sitio web corporativo moderno para una agencia de desarrollo web. Incluye un sistema de autenticación completo y múltiples secciones informativas.

## Características
- **100% Estático** - Solo HTML, CSS y JavaScript vanilla
- Sistema de autenticación con roles (Admin/Usuario)
- Diseño responsive y moderno
- Múltiples secciones: Inicio, Servicios, Mantenimiento, Portafolio, Sobre nosotros, Contacto
- Formularios funcionales
- Animaciones suaves
- Compatible con cualquier servidor web (XAMPP, Apache, Nginx, etc.)

## Instalación

### Para XAMPP:
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

### Para otros servidores:
- **Apache/Nginx**: Copia los archivos a tu directorio web
- **Python**: `python -m http.server 8000` en la carpeta del proyecto
- **Node.js**: `npx http-server` en la carpeta del proyecto
- **PHP**: `php -S localhost:8000` en la carpeta del proyecto

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
├── index.html          # Página principal con todo el contenido
├── css/
│   └── styles.css      # Todos los estilos CSS
├── js/
│   └── script.js       # Toda la funcionalidad JavaScript
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
- Imágenes de Pexels

## Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:
```css
/* Busca y modifica estos colores */
#007bff (azul principal)
#20b2aa (verde azulado)
#333 (gris oscuro)
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

### Cambiar Imágenes
Las imágenes actuales son de Pexels. Puedes:
1. Reemplazar las URLs por tus propias imágenes
2. Subir imágenes locales a una carpeta `images/`
3. Usar otros servicios de imágenes gratuitas

## Compatibilidad
- ✅ Todos los navegadores modernos
- ✅ Internet Explorer 11+
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ Desktop

## Soporte

Para soporte técnico o consultas:
- Email: contacto@goweb.com
- Teléfono: +1 (555) 123-4567

## Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

**¡Listo para usar!** Solo abre `index.html` en tu navegador o súbelo a tu servidor web favorito.