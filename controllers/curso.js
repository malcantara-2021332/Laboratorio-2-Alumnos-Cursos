const { response, request } = require('express');

//Modelo - Alumno
const Curso = require('../models/curso');

const obtenerCurso = async(req = request, res = response) => {

    const query = {estado: true};

    const listaCurso = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query).populate('alumno', 'nombre')
    ]);

    res.json({
        msg: 'GET de Cursos',
        listaCurso
    });
}

const obtenerCursoPorId = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'Get de Cursos por ID',
        id
    });
}

const crearCurso = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const cursoDB = await Curso.findOne({ nombre });
    if (cursoDB) {
        return res.status(400).json({
            msg: `Ya esta asignado al curso de: ${cursoDB.nombre}`
        });
    }

    //Guardar data
    const data = {
        nombre,
        alumno: req.alumno._id
    }

    const cursoAgregado = new Curso(data);

    //Guardar en DB
    await cursoAgregado.save();

    res.status(201).json({
        msg: 'Post de Cursos',
        cursoAgregado
    });
}


module.exports = {
    obtenerCurso,
    obtenerCursoPorId,
    crearCurso
}