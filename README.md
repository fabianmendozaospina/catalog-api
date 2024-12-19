# Catalog-API

Project Catalog-API (Backend) repository developed with Node.js and Express.

## Let's start the project in development
- Make sure you have Docker Desktop installed on your PC.
- Run the project with the following command:

  ```
  docker-compose up --build
  ```
- **NO** need to issue `npm install`.🚫
- Wait for the `backend` container to finish building and loading.
- The API will be running on port 5000. 🚀

## API Documentation

Follow these steps to explore the documentation:

- Via web: https://documenter.getpostman.com/view/16132451/2sA2xcaah6
- Or locally:
  - Import the `Catalogo-API.postman_collection.json` file located in the root of the project into `Postman`.
  - Click the `...` button on the collection and choose the `View documentation` option.
    
## Instalación en ASW
Recomendaciones para el despliegue en ASW:

1. Crear una cuenta de AWS:
Si aún no tienes una cuenta en AWS, regístrate en AWS Console.

2. Preparar tu aplicación:
Asegúrate de que tu aplicación esté lista para ser desplegada y que puedas ejecutarla localmente con éxito.

3. Configurar la base de datos MongoDB en AWS:
Puedes usar Amazon DocumentDB como servicio de base de datos compatible con MongoDB en AWS.

4. **Configurar el backend**:
- 4.1. Crear una instancia EC2 para el servidor Node.js:
Ve a la AWS Console y selecciona EC2 en la sección de servicios.
Haz clic en "Launch Instance" y selecciona una AMI de tu elección (por ejemplo, Amazon Linux).
Configura las instancias según tus necesidades (asegúrate de abrir los puertos necesarios para tu aplicación).
Asocia una clave SSH para acceder a la instancia.
- 4.2. Instalar Node.js y configurar tu aplicación:
Conéctate a tu instancia EC2 usando SSH.
Instala Node.js y npm.
Clona tu repositorio de código en la instancia.
Configura tu aplicación Node.js y asegúrate de que esté funcionando correctamente.
5. Configurar seguridad:
Configura grupos de seguridad en EC2 para controlar el tráfico de red.
Utiliza AWS Identity and Access Management (IAM) para gestionar permisos y accesos.
6. Monitoreo y escalado:
Configura Amazon CloudWatch para monitorear tus instancias y utiliza Auto Scaling para escalar automáticamente tus recursos según la demanda.

## Justificación del Stack tecnológico

- NodeJs: Runtime basado en JavaScript que permite ejecutar código del lado del servidor. Su modelo de operación no bloqueante y su capacidad para manejar múltiples conexiones concurrentes lo hacen ideal para aplicaciones de alta concurrencia, como las API. Además, al usar JavaScript tanto en el frontend como en el backend, se facilita la coherencia en el desarrollo.
  
- MongoDB: Base de datos NoSQL que utiliza un formato de documentos BSON (similar a JSON). En proyectos como éste donde la estructura de los datos puede variar y evolucionar con el tiempo, MongoDB proporciona flexibilidad al permitir esquemas dinámicos. También es eficiente para manejar grandes cantidades de datos no estructurados, como en un catálogo de productos, que podrá crecer con el tiempo.
  
- Mongoose: Biblioteca de modelado de objetos MongoDB para Node.js. Facilita la interacción con la base de datos MongoDB al proporcionar una capa de abstracción y definir modelos con esquemas predefinidos. Esto nos agiliza el desarrollo al simplificar las operaciones de CRUD y validar los datos antes de almacenarlos.
  
- Express: Framework para Node.js que simplifica la creación de aplicaciones web y APIs. Facilita la gestión de rutas, middleware y solicitudes HTTP. Al ser minimalista y modular, es ideal para construir APIs RESTful de manera eficiente, como la nuestra.
  
- Jsonwebtoken: Usado para la autenticación basada en tokens. En una API, el uso de tokens JWT es común para gestionar la autenticación y autorización. Proporciona una forma segura de transmitir información de usuario entre el cliente y el servidor sin necesidad de almacenar información de sesión en el servidor.
 
- Cors: (Cross-Origin Resource Sharing) es necesario que nuestra API pueda ser accedida desde un dominio diferente al de la aplicación frontend. Al permitir el acceso controlado desde orígenes específicos, CORS ayuda a garantizar la seguridad del navegador mientras permite solicitudes desde dominios autorizados.
  
- Bcrypt: Librería de hashing diseñada para almacenar contraseñas de manera segura. En un sistema de autenticación, es crucial almacenar las contraseñas de forma segura para proteger la información del usuario. Bcrypt utiliza un algoritmo de hashing lento y salting, lo que lo hace resistente a los ataques de fuerza bruta.

- Docker: Proporciona una solución integral para mejorar el desarrollo y la implementación de aplicaciones. Facilita la portabilidad del entorno, permitiendo que la aplicación se ejecute de manera consistente en diferentes máquinas. Con la gestión aislada de dependencias y la capacidad de orquestar múltiples contenedores, Docker simplifica la escalabilidad y el despliegue de aplicaciones como esta.
