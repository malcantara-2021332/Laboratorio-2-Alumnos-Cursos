//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Alumno = require('../models/alumno');


const getAlumno = async(req = request, res = response) => {

    const query = {estado: true};

    const listaAlumnos = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
    ]);

    res.json({
        msg: 'GET de Alumnos',
        listaAlumnos
    });
}

const postAlumno = async (req = request, res = response) => {

    //Cuando se quiera asignar otro rol
    // const { nombre, correo, password, rol } = req.body;
    // const alumnoDB = new Alumno({ nombre, correo, password, rol });

    const {nombre, correo, password} = req.body;
    const alumnoDB = new Alumno({nombre, correo, password});

    const salt = bcryptjs.genSaltSync();
    alumnoDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await alumnoDB.save();

    res.status(201).json({
        msg: 'POST de Alumnos',
        alumnoDB
    });

}

const putAlumno = async (req = request, res = response) => {

    const {id} = req.params;

    //Ignoramos el _id, rol, y el estado al momento de editar y mandar la petición en el req.body
    const {_id, rol, estado, ...resto} = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //Editar y guardar
    const alumnoEditado = await Alumno.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT de Alumnos',
        alumnoEditado
    });

}

const deleteAlumno = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    //const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    //editar y guardar
    const alumnoEliminado = await Alumno.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE de Alumnos',
        alumnoEliminado
    });

}



module.exports = {
    getAlumno,
    postAlumno,
    putAlumno,
    deleteAlumno
}