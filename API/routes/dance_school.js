var express = require('express');
var router = express.Router();
const connection = require('../config/db.js')
var dance_schoolController = require ('../controllers/dance_schoolController')

//Ver todas las escuelas de danza http://localhost:3000/schoolDance
router.get('/',dance_schoolController.getSchoolDances)

//Ver todas las escuelas de danza creadas por un usuario
// http://localhost:3000/schoolDance/owned_by_user_id
router.get('/:owned_by_user_id',dance_schoolController.getSchoolDancesbyTeacher)

// Creamos un nuevo usuario   http://localhost:3000/schoolDance/create
router.post('/create',dance_schoolController.create);

//Editar una escuela de baile http://localhost:3000/schoolDance/edit/id <- de la escuela que queramos ver
router.get('/edit/:dance_school_id',dance_schoolController.edit);

//Actualizar una escuela de baile http://localhost:3000/schoolDance/update/id <- de la escuela que queramos ver
router.post('/update/:dance_school_id',dance_schoolController.update);

//borrar (logico) una escuela http://localhost:3000/schoolDance/delete/id <- de la escuela que quiera borrar
router.get('/delete/:dance_school_id',dance_schoolController.delete);

// ESCUELA DE DANZA FIN ----------------------------------------------------


module.exports = router;