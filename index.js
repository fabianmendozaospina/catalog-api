import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import productosRoutes from './routes/productosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

// Middleware para proteger las rutas.
import authHandler from './middleware/authHandler.js';

// Middleware para manejo de errores de negocio.
import errorsHandler from './middleware/errorsHandler.js';

// Conectar mongo.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

// Crear el servidor.
const app = express();

// Habilitar bodyparser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if (process.env.NODE_ENV === 'production') {
    // Definir dominio(s) para recibir las peticiones.
    const whiteList = [process.env.FRONTEND_URL];
    const corsOptions = {
        origin: (origin, callback) => {
            // Revisar si la petición viene de un servidor que está en whiteList.
            const existe = whiteList.some(dominio => dominio === origin.toString());

            if(existe) {
                callback(null, true);
            } else {
                callback(new Error('No permitido por CORS'));
            }
        }
    }

    // Habilitar CORS.
    app.use(cors(corsOptions));

} else {
    app.use(cors());
}

// Incorporar rutas y middlewares.
app.use('/', usuariosRoutes());
app.use(authHandler);
app.use('/', productosRoutes());
app.use(errorsHandler);

// Escuchar por el puerto.
app.listen(process.env.PORT, () => {
    console.log(`El servidor está corriendo por el puerto ${process.env.PORT}`);
});