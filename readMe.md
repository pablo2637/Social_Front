# Social Connect: Front

Esta es una web SPA creada con NodeJS y React. Cuenta con 3 tipos de vistas:
- Pública: cualquier usuario puede ver el contenido
- Privada: se puede ver contenido adicional y también crear contenido nuevo
- Administración: un usuario administrador se encarga de supervisar todo el contenido creado en la web y gestionarlo

---
## **Tecnologías utilizadas:**
- @react-firebase/auth: "^0.2.10"
- @reduxjs/toolkit: "^1.9.5"
- firebase: "^9.20.0"
- jsdoc-react: "^1.0.0"
- react: "^18.2.0"
- react-dom: "^18.2.0"
- react-redux: "^8.0.5"
- react-router-dom: "^6.10.0"
- react-scroll-to-bottom: "^4.2.0"
- socket.io-client: "^4.6.1"

---
## Iniciar la App:
Se debe ejecutar el comando **yarn**, y luego **yarn dev**. O sino, ejecutar **yarn build** y ver la app de la carpeta *dist*.
También es posible probar la aplicación desde la página de [Netlify](https://socialconnect2637.netlify.app/)

---
## Concepto general:
Esta es una aplicación social, que permite a los usuarios interactuar entre ellos, siendo posible crear perfiles públicos con fotografías y texto, y perfiles privados a los que sólo tienen acceso los usuarios registrados.

**Usuarios de prueba:**
* email: *ana@correo.es*
    * password: *123456*

* email: *luis@correo.es*
    * password: *123456*

* email: *juanita@correo.es*
    * password: *123456*

**Usuario administrador:**
* email: *pepe@correo.es*
    * password: *123456*

Los usuarios registrados pueden enviar mensajes a los otros usuarios o establecer comunicaciones directas a través de un chat privado, siempre y cuando se haya enviado primero una solicitud de amistad y ésta haya sido aceptada.
El usuario administrador puede ver todos los perfiles creados, tanto públicos como privados y editarlos. Tambíen puede enviarle mensaje a los usuarios o si lo considera necesario eliminar el usuario completamente de la app.

---
## Almacenamiento:
Toda la información se guarda en servicios en la nube, por lo que estan accesibles desde cualquier ubicación.
* Las imágenes en **Cloudinary**
* Todos los datos en una base de datos de **MongoDB**
* Las credenciales de acceso en el servidor de **Firebase**

---
Autenticación:
Se utiliza *Firebase* para gestionar los usuarios. Una vez superado el registro los datos se almacenan también la base de datos propia de la aplicación (**MongoDB**). 
Los usuarios tienen posibilidad de utilizar una cuenta de **Google** para loguearse directamente sin necesidad de registrarse, aunque internamente el mecanismo sería igual que un registro normal, es decir, que el usuario se crea y almacena en la base de datos propia.

---
## .env:

- *Todos los datos de configuración que proporciona Firebase:*
VITE_FBASE_API_KEY=
VITE_FBASE_AUTH_DOMAIN=
VITE_FBASE_PROJECT_ID=
VITE_FBASE_STORAGE_BUCKET=
VITE_FBASE_MESSAGING_SENDER_ID=
VITE_FBASE_APP_ID=

- *La URL de conexión al back:*
VITE_URL_BACK=
VITE_URL_CHAT_BACK=

- *La cantidad de reconexiones permitida por el socket.io*
VITE_RECONNECTION_ATTEMPTS=

*Todos estos datos se pasarán en un archivo adjunto.