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

## 📧 CONFIGURACIÓN DE EMAIL (OBLIGATORIA)

### ⚠️ IMPORTANTE: Para que los emails funcionen, DEBES configurar EmailJS

Los emails actualmente **NO FUNCIONAN** porque necesitas configurar tu propia cuenta de EmailJS. Sigue estos pasos:

### Paso 1: Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Configurar servicio de email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona **Gmail** (recomendado)
4. Conecta tu cuenta de Gmail
5. Copia el **Service ID** (ejemplo: `service_abc123`)

### Paso 3: Crear template de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este template:

**Asunto del email:**
```
Nuevo mensaje desde GoWeb - {{form_type}}
```

**Contenido del email:**
```html
Hola,

Has recibido un nuevo mensaje desde tu sitio web GoWeb:

Tipo de formulario: {{form_type}}
Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
{{#company}}Empresa: {{company}}{{/company}}
{{#website}}Sitio Web: {{website}}{{/website}}
{{#service}}Servicio: {{service}}{{/service}}

Mensaje:
{{message}}

---
Para responder, envía un email a: {{reply_to}}
Enviado desde: www.goweb.com
```

4. En "Settings" del template:
   - **To email:** Tu email donde quieres recibir los mensajes
   - **From name:** GoWeb
   - **Reply to:** {{reply_to}}

5. Guarda el template y copia el **Template ID** (ejemplo: `template_xyz789`)

### Paso 4: Obtener Public Key
1. Ve a "Account" > "General"
2. Copia tu **Public Key** (ejemplo: `user_abc123xyz`)

### Paso 5: Configurar el código
Edita el archivo `js/script.js` y reemplaza estas líneas al inicio del archivo:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'TU_SERVICE_ID_AQUI',     // Reemplaza con tu Service ID
    templateId: 'TU_TEMPLATE_ID_AQUI',   // Reemplaza con tu Template ID
    publicKey: 'TU_PUBLIC_KEY_AQUI'      // Reemplaza con tu Public Key
};
```

### Ejemplo de configuración:
```javascript
const EMAILJS_CONFIG = {
    serviceId: 'service_abc123',
    templateId: 'template_xyz789',
    publicKey: 'user_abc123xyz'
};
```

### Paso 6: Probar el funcionamiento
1. Guarda los cambios
2. Recarga la página web
3. Llena cualquier formulario y envíalo
4. Revisa tu email (también la carpeta de spam)

## 🚀 Instalación

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

## 🔐 Cuentas de Prueba

### Administrador
- **Email:** oscar@goweb.com
- **Contraseña:** oscaradmin123
- **Tipo:** Admin

### Usuario Regular
- **Email:** oscar@goweb.com
- **Contraseña:** oscaruser123
- **Tipo:** Usuario

### Otras cuentas disponibles:
- sergio@goweb.com (sergiouser123 / sergioadmin123)
- diego@goweb.com (diegouser123 / diegoadmin123)

## 📁 Estructura del Proyecto

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

## ✨ Funcionalidades

### Sistema de Autenticación
- Login con email y contraseña
- Selección de tipo de usuario (Admin/Usuario)
- Validación de credenciales
- Sesión persistente durante la navegación

### Formularios con Email
- **Formulario de Contacto**: Envía emails con información de contacto
- **Formulario de Mantenimiento**: Envía solicitudes de mantenimiento
- **Formulario de Servicios**: Modal para solicitar servicios específicos
- Validación en tiempo real
- Confirmación visual de envío
- Manejo de errores robusto

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
- **Visualización de mensajes** recibidos
- Subida de archivos local

## 🛠️ Personalización

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
    { id: '7', email: 'nuevo@email.com', password: 'password', name: 'Nuevo Usuario', role: 'user' }
];
```

## 🔧 Solución de Problemas

### Los emails no se envían
1. **Verifica la configuración de EmailJS**:
   - Service ID correcto
   - Template ID correcto
   - Public Key correcto
2. **Revisa la consola del navegador** (F12) para errores
3. **Verifica tu template de EmailJS**:
   - Que tenga los campos correctos: {{from_name}}, {{from_email}}, etc.
   - Que el email de destino esté configurado
4. **Revisa tu carpeta de spam**

### Error de CORS
Si usas un servidor local, asegúrate de que esté corriendo en HTTP/HTTPS, no como archivo local.

### Formularios no funcionan
1. Verifica que JavaScript esté habilitado
2. Revisa la consola para errores
3. Asegúrate de que todos los campos requeridos estén completos
4. Verifica que EmailJS esté configurado correctamente

### Los mensajes no aparecen en el panel de admin
Los mensajes se guardan localmente en el navegador. Si cambias de navegador o borras los datos, se perderán. Para una solución permanente, considera usar una base de datos.

## 🌐 Compatibilidad
- ✅ Todos los navegadores modernos
- ✅ Internet Explorer 11+
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ Desktop

## 📊 Límites de EmailJS (Plan Gratuito)
- **200 emails por mes**
- **50 emails por día**
- Para más volumen, considera actualizar a un plan pago

## 📞 Soporte

Para soporte técnico o consultas:
- Email: contacto@goweb.com
- Teléfono: +54 3704 047512

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

## ⚡ INICIO RÁPIDO

1. **Configura EmailJS** (obligatorio para emails)
2. **Sube los archivos** a tu servidor web
3. **Abre index.html** en tu navegador
4. **Inicia sesión** con las cuentas de prueba
5. **¡Listo para usar!**

**¡IMPORTANTE!** Sin configurar EmailJS, los formularios guardarán los mensajes localmente pero NO enviarán emails.