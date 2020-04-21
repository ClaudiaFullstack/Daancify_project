var express = require('express');
var router = express.Router();
const connection = require('../config/db.js')
var classController = require('../controllers/classController')


// CREATE  CLASS
// Creamos una classe   http://localhost:3000/class/create/:teacher_id <-  quien creo la clase
router.post('/create/:teacher_id', classController.createClass);

// SEE ALL  CLASS
// obtenemos todas las clases   http://localhost:3000/class
router.get('/', classController.getAllClass);

// SEE ALL  CLASS BY DATE
// Creamos una classe   http://localhost:3000/class/student
router.get('/student', classController.getClassByDate);


//DELETE CLASS
// Borramos una classe   http://localhost:3000/class/delete/:ID 
router.get('/delete/:class_id', classController.deleteClass)


// EDIT CLASS
// Editamos una classe http://localhost:3000/class/edit/:ID
router.get('/edit/:class_id', classController.editClass);


//UPDATE CLASS
// Añadimos una clase http://localhost:3000/class/update/:ID
router.post('/update/:class_id', classController.updateClass);

//Ver todos los tipos de estilos de bailes
// Añadimos una classe http://localhost:3000/class/danceStyle
router.get('/danceStyle', classController.danceStyle)

//Ver las clases de un profesor
//http://localhost:3000/class/teacher/:id

router.get('/teacher/:teacher_id', classController.getClassTeacher)

//Ver las clases de ´mas cercanas profesor
//http://localhost:3000/class/teacherClass/:id

router.get('/teacherClass/:teacher_id', classController.getClassTeacherTime)


//Ver las clases en la que esta apuntado un alumno
//http://localhost:3000/class/register
router.post('/register',classController.getClassRegister)


//Ver las clases en la que esta apuntado un alumno
//http://localhost:3000/class/signUp/:id
router.get('/signUp/:user_id',classController.getClassSignUp)

//Ver si esta apuntado un alumno a una clase
//http://localhost:3000/class/seeRegister
router.post('/seeRegister',classController.seeRegister)

//Quitarte si esta apuntado un alumno a una clase
//http://localhost:3000/class/deleteSignUp
router.post('/deleteSignUp',classController.deleteClassSignUp)

// Ver todas las clases proximas por filtro
//http://localhost:3000/class/classFilter
router.post('/classFilter',classController.getClassFilter)

module.exports = router;
