import express from 'express';
import { registrarUsuario, autenticarUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

export default () => {
    // Crear usuarios.
    router.post('/crear-cuenta', 
        registrarUsuario
    );

    // Iniciar sesión.
    router.post('/iniciar-sesion',
        autenticarUsuario
    );
    
    return router;
}
