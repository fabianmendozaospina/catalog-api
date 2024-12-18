import { ResourceNotFoundError, UnauthorizedError, BadRequestError } from '../utils/errorsTypes.js';

export default (error, _req, res, _next) => {
    if(error.name === 'ValidationError') {
        const detalle = Object.values(error.errors).map((e) => e.message);
        return res.status(422).json({ mensaje: 'Datos de entrada no válidos', detalle });
    }

    if(error.name === 'MongoServerError' && error.code === 11000) {
        const propertyName = Object.keys(error.keyValue)[0];
        const propertyValue = error.keyValue[propertyName];
        return res.status(409).json({ mensaje: `Ya existe el ${propertyName} ${propertyValue}` });
    }

    if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ mensaje: error.message });
    }

    if (error instanceof UnauthorizedError || error.name === 'TokenExpiredError') {
        return res.status(401).json({ mensaje: error.message });
    }    
    
    if (error instanceof BadRequestError) {
        return res.status(400).json({ mensaje: error.message });
    }    

    return res.status(500).json({ mensaje: 'Hubo un error inesperado', detalle: [error] });
}