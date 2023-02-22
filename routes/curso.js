//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

//Validaciones 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Controllers
const {obtenerCursoPorId, crearCurso, obtenerCurso} = require('../controllers/curso');

const router = Router();

//Get: Ver todos los cursos a los que esta asignado - Alumno
router.get('/', obtenerCurso);

router.get('/:id', [
    
],obtenerCursoPorId);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre del Curso en obligatorio').not().isEmpty(),
    validarCampos
],crearCurso);

module.exports = router;