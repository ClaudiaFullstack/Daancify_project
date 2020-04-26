var express = require('express');
var router = express.Router();
const connection = require('../config/db.js')
var userController = require('../controllers/userController')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

// USUARIOS INICIO
//GET USERS ----------------------------------------------------
// Obtenemos todos los usuarios http://localhost:3000/users
router.get('/', userController.getUsers);

// Obtenemos todos los Profesores http://localhost:3000/users/teachers
router.get('/teachers', userController.getTeachers);

// Obtenemos todos los Profesores filtrados para admin http://localhost:3000/users/teachersAdmin
router.get('/teachersAdmin', userController.getAdminTeachers);

//Login
// Obtenemos el usuario http://localhost:3000/users/login
router.post('/login', userController.login);


// SAVE USER
// Creamos un nuevo usuario   http://localhost:3000/users/saveUser
router.post('/saveUser', userController.saveUser);


// GET BY ID
// Obtenemos un usuario por su id  http://localhost:3000/users/:ID <- id del usuario que queremos editar
router.get('/:user_id', userController.getUserById);


// EDIT USER  
// Editamos un usuario   http://localhost:3000/users/edit/:ID <- id del usuario a modificar
router.post('/edit/:user_id', userController.updateUser);

// DELETE USER  
// Borramos un usuario   http://localhost:3000/users/delete/:ID <- id del usuario a borrar
router.get('/delete/:user_id', userController.deleteUser);

//UPDATE PROFILE
//http://localhost:3000/users/profile
router.post('/profile/:user_id', upload.single('avatar'), userController.updateFile);

//SEARCH USER
//http://localhost:3000/users/search
router.post('/search', userController.search);

// USUARIOS FIN -------------------------------------------------

module.exports = router;