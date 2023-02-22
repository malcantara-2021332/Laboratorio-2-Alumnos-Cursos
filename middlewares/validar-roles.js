const { request, responce } = require('express');


const esAdminRole = ( req = require, res = responce, next ) => {

    if ( !req.alumno ) {
        return  res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });

    }

    //Verificacion solo el rol de admin puede realizar la eliminacion
    //Si cumple con el rol de admin se envia al controlador deleteUsuario
    const { rol, nombre } = req.alumno
    if ( rol !== 'ADMIN_ROLE' ) {
        return  res.status(401).json({
            msg: `${ nombre }, no es admin - No puede hacer esto`
        });
    }

    next();

}

module.exports = {
    esAdminRole 
}