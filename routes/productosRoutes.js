import express from 'express';
import { crearProducto, mostrarProductos, mostrarProducto, 
         actualizarProducto, eliminarProducto, buscarProducto } from '../controllers/productosController.js';

const router = express.Router();

export default () => {
    // Nuevos productos
    router.post('/productos', 
        crearProducto
    );

    // Muestra todos los productos.
    router.get('/productos', 
        mostrarProductos
    );

    // Muestra un producto en especifico por su ID.
    router.get('/productos/:idProducto', 
        mostrarProducto
    );

    // Actualizar un producto en especifico por su ID.
    router.put('/productos/:idProducto', 
        actualizarProducto
    );

    // Eliminar Productos.
    router.delete('/productos/:idProducto', 
        eliminarProducto
    );

    // Búsqueda de Productos.
    router.post('/productos/busqueda/:query',
        buscarProducto
    );

    return router;
}