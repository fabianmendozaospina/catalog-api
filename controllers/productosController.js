import Productos from '../models/Productos.js';
import { ResourceNotFoundError } from '../utils/errorsTypes.js';

export const crearProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        await producto.save();

        res.status(201).json({mensaje : 'Se agregó un nuevo producto'})

    } catch (error) {
        console.error(error);
        next(error, req, res, next);
    }
} 

export const mostrarProductos = async (req, res, next) => {
    try {
        // Obtener todos los productos.
        const productos = await Productos.find({});

        // Mostrar los productos.
        res.status(200).json(productos);
        
    } catch (error) {
        console.error(error);
        next(error, req, res, next);
    }
}

// Muestra un producto en específico por su ID.
export const mostrarProducto = async (req, res, next) => {
    const idProducto = req.params.idProducto;

    try {
        const producto = await Productos.findById(idProducto);

        if(!producto) {
            throw new ResourceNotFoundError(`El producto ${idProducto} no existe`);
        }

        // Mostrar el producto.
        res.status(200).json(producto);

    } catch (error) {
        console.error(error);
        next(error, req, res, next);
    }
}

// Actualiza un producto por su id.
export const actualizarProducto = async (req, res, next) => {
    const idProducto = req.params.idProducto;

    try {
        let nuevosDatos = req.body;
        let producto = await Productos.findOneAndUpdate({_id : idProducto}, nuevosDatos, {
            new : true,
        });

        if(!producto) {
            throw new ResourceNotFoundError(`El producto ${idProducto} no existe`);
        }        

        res.status(200).json(producto);

    } catch (error) {
        console.error(error);
        next(error, req, res, next);
    }
}

// Elimina un producto via ID
export const eliminarProducto = async (req, res, next) => {
    const idProducto = req.params.idProducto;

    try {
        let producto = await Productos.findByIdAndDelete({ _id : idProducto });

        if(!producto) {
            throw new ResourceNotFoundError(`El producto ${idProducto} no existe`);
        }        

        res.status(200).json({mensaje : `El producto ${idProducto} se ha eliminado`});

    } catch (error) {
        console.error(error);
        next(error, req, res, next);
    }
}

export const buscarProducto = async (req, res, next) => {
    try {
        // Obtener el query.
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });

        res.status(200).json(producto);

    } catch (error) {
        console.error(error);
        next(error, req, res, next);
    }
}