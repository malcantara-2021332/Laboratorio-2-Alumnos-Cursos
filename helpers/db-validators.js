//Importaciones
const Alumno = require('../models/alumno');
const Role = require('../models/role');

//Validamos en contro de la db si ese correp ya existe
const emailExiste = async(correo = '') => {

    //Verificar si el correo existe en la base de datos
    //Por ser archivo JSON es n llaves {correo}
    const existeEmailDeAlumno = await Alumno.findOne({correo})

    if (existeEmailDeAlumno) {
        throw new Error(`El correo${ correo }, ya esta registrado en la DB`);
    }     
}

const esRoleValido = async(rol = '') => {   
    //Verificar si el rol es valido y existe en la DB
    const existeRoleDB = await Role.findOne({rol})

    if (!existeRoleDB) {
        throw new Error(`El rol ${rol}, no existe en la DB`)
    }
}

const existeAlumnoPorId = async(id) => {
    //Verificar si existe el ID
    //El Usuario siendo mi modelo desde alli busco ID
    const existIdOfAlumno = await Alumno.findById(id);

    if (!existIdOfAlumno) {
        throw new Error(`El id: ${id} no existe en la DB`)
    }

}

module.exports = {
    emailExiste,
    esRoleValido,
    existeAlumnoPorId,
}