import { Schema, model } from 'mongoose';

const productosSchema = new Schema({
    nombre : {
        type: String,
        trim: true,
        required: [true, 'Nombre es requerido'],
        minlength: [3, 'Nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'Nombre debe tener máximo 50 caracteres']          
    },
    descripcion : {
        type: String,
        trim: true,
        required: [true, 'Descripción es requerida'],
        minlength: [5, 'Descripción debe tener al menos 5 caracteres'],
        maxlength: [250, 'Descripción debe tener máximo 250 caracteres']          
    },    
    precio: {
        type: Number,
        required: [true, 'Precio es requerido'],
        min: [1, 'Precio mínimo permitido: 1'],
        max: [99999999, 'Precio máximo permitido: 99999999']
    }
});

export default model('Productos', productosSchema);