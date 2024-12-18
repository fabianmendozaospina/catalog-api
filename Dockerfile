# Utiliza una imagen base de Node.js
FROM node:20.11.1

# Establece el directorio de trabajo en la aplicación
WORKDIR /app

# Copia el archivo package.json e instala las dependencias
COPY package.json .
RUN npm install

# Copia todos los archivos al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]