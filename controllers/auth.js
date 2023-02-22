//Login

const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const Alumno = require('../models/alumno');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el correo existe
        const alumno = await Alumno.findOne({ correo });
        if (!alumno) {
            return res.status(404).json({
                msg: 'Correo de alumno no existe en la DB'
            });
        }

        //Si el alumno esta activo (alumno.estado === false)
        if (alumno.estado === false) {
            return res.status(400).json({
                msg: 'La cuenta del Alumno esta inactiva'
            });
        }    
    
        //Verificar la password del usuario
        const validarPassword = bcryptjs.compareSync(password, alumno.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'La password es incorrecta'
            });
        }

        //Generacion del json token JWT
        const token = await generarJWT(alumno.id);
    
        res.json({
            msg: 'Login Auth Funciona!',
            correo, password,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }

}


module.exports = {
    login
}