import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errorsTypes.js';

export default (req, res, next) => {
    // Autorización por el header.
    const authHeader = req.get('Authorization');

    if(!authHeader || authHeader == 'Bearer') {
        throw new UnauthorizedError('No autenticado, no hay JWT');
    }

    // Obtener el token y verificarlo.
    const token = authHeader.split(' ')[1];
    let revisarToken;
    
    try {
        revisarToken = jwt.verify(token, process.env.JWT_KEY);
        
    } catch (error) {
        return next(error, null, res, null);
    }

    // Si es un token válido, pero hay algún error.
    if(!revisarToken) {
        throw new UnauthorizedError('No autenticado');
    }

    return next();
}