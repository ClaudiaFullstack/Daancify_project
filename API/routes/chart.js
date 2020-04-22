var express = require('express');
var router = express.Router();
const connection = require('../config/db.js')
var chartController = require('../controllers/chartController')



//  CONSULTAS GRÁFICOS----------------------------------------------------

// Obtenemos count de todos los chart http://localhost:3000/chart/createdUsers
router.get('/CreatedUsers', chartController.getCreatedUsers);

// Obtener count (Usuarios Activos)  http://localhost:3000/chart/activeUsers
router.get('/activeUsers', chartController.getActiveUsers);

// Obtenemos (Usuarios Borrados) http://localhost:3000/chart/erasedUsers
router.get('/erasedUsers', chartController.getErasedUsers);

// Obtenemos Classes (Activas y borradas) http://localhost:3000/chart/createdClasses
router.get('/createdClasses', chartController.getCreatedClasses);

// Obtenemos Class (Activas)  http://localhost:3000/chart/activeClasses
router.get('/activeClasses', chartController.getActiveClasses);

// Obtenemos Class (Borradas) http://localhost:3000/chart/erasedClasses
router.get('/erasedClasses', chartController.getErasedClasses);

// Obtenemos clases realizadas en 2020 http://localhost:3000/chart/createdClasses2020
router.get('/createdClasses2020', chartController.getCreatedClasses2020);

// Obtenemos Teachers (Activos y borrados) http://localhost:3000/chart/createdTeachers
router.get('/createdTeachers', chartController.getCreatedTeachers);

// Obtenemos Teachers (Activos) http://localhost:3000/chart/activeTeachers
router.get('/activeTeachers', chartController.getActiveTeachers);

// Obtenemos Teachers (Borrados) http://localhost:3000/chart/erasedTeachers
router.get('/erasedTeachers', chartController.getErasedTeachers);


module.exports = router;