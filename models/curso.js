const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        require: true
    }
});

module.exports = model('Curso', CursoSchema);