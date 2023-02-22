//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getAlumno, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno');
const { emailExiste, esRoleValido, existeAlumnoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getAlumno);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'la password es obligatoria para el post').not().isEmpty(),
    check('password', 'La passward debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol', 'El rol es obligatorio para el post').not().isEmpty(),
    //check('rol').custom(esRoleValido),
    validarCampos
] , postAlumno);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeAlumnoPorId),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'la password es obligatoria para el post').not().isEmpty(),
    check('password', 'La passward debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('rol').custom(esRoleValido),
    validarCampos
], putAlumno);


router.delete('/eliminar/:id', [
    validarJWT,
    //esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeAlumnoPorId),
    validarCampos
], deleteAlumno);


module.exports = router;