import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuarios from '../models/Usuarios.js';
import { UnauthorizedError, BadRequestError } from '../utils/errorsTypes.js';

export const registrarUsuario = async (req, res, next) => {
    // Leer los datos del usuario y colocarlos en el modelo.
    const { password, confirmar } = req.body;

    try {
        if(password !== confirmar) {
            throw new BadRequestError(`Contraseña mal confirmada`);
        }

        const usuario = new Usuarios(req.body);

        usuario.password = await bcrypt.hash(req.body.password, 12);
        
        await usuario.save();

        res.status(201).json({mensaje : 'Usuario creado correctamente'});

    } catch (error) {
        console.error(error);
        next(error, req, res, next);
    }
}

export const autenticarUsuario = async (req, res, next) => {
    // Buscar el usuario.
    const { email, password } = req.body;

    try {
        const usuario = await Usuarios.findOne({ email });

        if(!usuario) {
            // Si el usuario no existe.
            throw new UnauthorizedError(`El usuario ${email} no existe`);

        } else {
            // El usuario existe, verificar si el password es correcto o incorrecto.
            if(!bcrypt.compareSync(password, usuario.password )) {
                // Si el password es incorrecto.
                throw new UnauthorizedError('Password Incorrecto');
                
            } else {
                // Password correcto, firmar el token.
                const token = jwt.sign({
                    email : usuario.email, 
                    nombre: usuario.nombre, 
                    id : usuario._id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn : '1h'
                });

                // Retornar el TOKEN.
                res.status(200).json({ token });
            }
        }
    } catch (error) {
        console.error(error);
        next(error, req, res, next);
    }
}