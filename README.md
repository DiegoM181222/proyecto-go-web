# GoWeb - Sitio Web con Integración de Email

## Descripción
GoWeb es un sitio web corporativo moderno para una agencia de desarrollo web. Incluye un sistema de autenticación completo, múltiples secciones informativas y **integración de email para formularios**.

## Características
- **100% Estático** - Solo HTML, CSS y JavaScript vanilla
- Sistema de autenticación con roles (Admin/Usuario)
- **Envío de emails automático** desde formularios de contacto y mantenimiento
- Diseño responsive y moderno
- Múltiples secciones: Inicio, Servicios, Mantenimiento, Portafolio, Sobre nosotros, Contacto
- Formularios funcionales con validación
- Animaciones suaves
- Compatible con cualquier servidor web (XAMPP, Apache, Nginx, etc.)

## 📧 Configuración de Email (EmailJS)

### Paso 1: Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Configurar servicio de email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. Copia el **Service ID**

### Paso 3: Crear template de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este template básico:

```html
Asunto: Nuevo mensaje desde GoWeb - {{form_type}}

Hola,

Has recibido un nuevo mensaje desde tu sitio web GoWeb:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
{{#company}}Empresa: {{company}}{{/company}}
{{#website}}Sitio Web: {{website}}{{/website}}
{{#service}}Servicio: {{service}}{{/service}}

Mensaje:
{{message}}

---
Tipo de formulario: {{form_type}}
Enviado desde: www.goweb.com
```

4. Guarda el template y copia el **Template ID**

### Paso 4: Obtener Public Key
1. Ve a "Account" > "General"
2. Copia tu **Public Key**

### Paso 5: Configurar el código
Edita el archivo `js/script.js` y reemplaza estas líneas:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'TU_SERVICE_ID_AQUI',     // Reemplaza con tu Service ID
    templateId: 'TU_TEMPLATE_ID_AQUI',   // Reemplaza con tu Template ID
    publicKey: 'TU_PUBLIC_KEY_AQUI'      // Reemplaza con tu Public Key
};
```

### Paso 6: Configurar email de destino
En el template de EmailJS, asegúrate de configurar tu email como destinatario, o modifica esta línea en el código:

```javascript
to_email: 'tu-email@ejemplo.com' // Cambia por tu email real
```

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
│   └── script.js       # Funcionalidad JavaScript + EmailJS
├── images/             # Imágenes del proyecto
│   └── image copy copy.png  # Logo principal
└── README.md           # Este archivo
```

## Funcionalidades

### Sistema de Autenticación
- Login con email y contraseña
- Selección de tipo de usuario (Admin/Usuario)
- Validación de credenciales
- Sesión persistente durante la navegación

### Formularios con Email
- **Formulario de Contacto**: Envía emails con información de contacto
- **Formulario de Mantenimiento**: Envía solicitudes de mantenimiento
- Validación en tiempo real
- Confirmación visual de envío
- Manejo de errores

### Secciones del Sitio
1. **Inicio** - Página principal con hero section
2. **Servicios** - Paquetes de servicios con precios y video
3. **Mantenimiento** - Formulario de solicitud de mantenimiento
4. **Portafolio** - Showcase de proyectos realizados
5. **Sobre nosotros** - Información del equipo
6. **Contacto** - Formulario de contacto completo

### Panel de Administración
- Gestión de servicios
- Gestión de portafolio
- Gestión de equipo
- Gestión de imágenes
- Subida de archivos local

## Personalización

### Cambiar Información de Contacto
Edita directamente en `index.html`:
- Teléfono: `+54 3704 047512`
- Ubicación: `Argentina, Formosa`
- Email: `contacto@goweb.com`

### Cambiar Video de Servicios
El video actual es: `https://youtu.be/1wpK__sFuqI`
Para cambiarlo, edita la URL del iframe en la sección de servicios.

### Cambiar Nombres del Equipo
Los nombres actuales son:
1. Gómez Bobadilla, Sergio Oscar
2. Rivas, Sergio
3. Mendoza, Diego

### Agregar Usuarios
Modifica el array `users` en `js/script.js`:
```javascript
this.users = [
    { id: '3', email: 'nuevo@email.com', password: 'password', name: 'Nuevo Usuario', role: 'user' }
];
```

## Solución de Problemas

### Los emails no se envían
1. Verifica que hayas configurado correctamente EmailJS
2. Revisa la consola del navegador para errores
3. Asegúrate de que tu Service ID, Template ID y Public Key sean correctos
4. Verifica que tu servicio de email esté activo en EmailJS

### Error de CORS
Si usas un servidor local, asegúrate de que esté corriendo en HTTP/HTTPS, no como archivo local.

### Formularios no funcionan
1. Verifica que JavaScript esté habilitado
2. Revisa la consola para errores
3. Asegúrate de que todos los campos requeridos estén completos

## Compatibilidad
- ✅ Todos los navegadores modernos
- ✅ Internet Explorer 11+
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ Desktop

## Límites de EmailJS (Plan Gratuito)
- 200 emails por mes
- 50 emails por día
- Para más volumen, considera actualizar a un plan pago

## Soporte

Para soporte técnico o consultas:
- Email: contacto@goweb.com
- Teléfono: +54 3704 047512

## Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

**¡Listo para usar!** Solo configura EmailJS y abre `index.html` en tu navegador o súbelo a tu servidor web favorito.