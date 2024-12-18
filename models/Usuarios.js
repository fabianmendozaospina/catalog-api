import { Schema, model } from 'mongoose';

const usuariosSchema = new Schema({
    email: {
        type: String, 
        lowercase: true,
        trim : true, 
        unique: true,
        required: [true, 'Email es requerido'],
        maxlength: [50, 'Email debe tener máximo 50 caracteres'],
        match: [
            /^\S+@\S+\.\S+$/,
            'Email no es válido'
        ]        
    },
    nombre : {
        type: String, 
        required: [true, 'Nombre es requerido'],
        minlength: [3, 'Nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'Nombre debe tener máximo 50 caracteres']     
    }, 
    password: {
        type: String, 
        required: [true, 'Password es requerido']       
    }
});

export default model('Usuarios', usuariosSchema);