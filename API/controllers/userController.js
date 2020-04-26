const connection = require('../config/db');
const controller = {};
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
let key = "secret";


// OBTENER TODOS LOS USUARIOS
//GET USERS
controller.getUsers = (_req, res) => {
    let sql = "SELECT * FROM user,dance_style_user,dance_style where user.user_id = dance_style_user.user_id AND dance_style.dance_style_id = dance_style_user.dance_style_id AND user.logical_erase = 0 ";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results);
        }
    })
}

// OBTENER TODOS LOS PROFESORES
controller.getTeachers = (_req, res) => {
    let sql = "SELECT * FROM user,dance_style_user,dance_style where user.user_id = dance_style_user.user_id AND dance_style.dance_style_id = dance_style_user.dance_style_id AND user_type = 2 AND user.logical_erase = 0 ";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results);
        }
    })
}

// OBTENER PROFESORES PARA ADMIN
controller.getAdminTeachers = (_req, res) => {
    let sql = "SELECT user_id , user_name, last_name FROM user WHERE user_type = 2 and logical_erase = 0;";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results);
        }
    })
}

//Login
controller.login = (req, res) => {
    let password = sha1(req.body.password);
    let user_name = req.body.user_name;
    let sql = `SELECT * FROM user WHERE password="${password}" AND user_name="${user_name}" AND logical_erase = 0;`
    console.log(password);
    console.log(user_name);
    connection.query(sql,
        function(error, results) {
            if (error) {
                console.log(error);
            } else if (results.length) {
                const { user_id, user_name, password } = results[0];
                const token = jwt.sign({ user_id, user_name, password }, key);
                res.send({ token, user: results[0] });
                // res.send(results);
            } else {
                res.sendStatus(400);
            }
        }
    )
}

//Usuario ID
controller.getUserById = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user,dance_style_user,dance_style 
    where user.user_id = dance_style_user.user_id 
    AND dance_style.dance_style_id = dance_style_user.dance_style_id 
    AND user.logical_erase = 0 
    AND user.user_id = ${user_id}`;


    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results);
        }
    })
}

// CREAMOS UN NUEVO USUARIO sin img
// SAVE USER 
controller.saveUser = (req, res) => {
    let { name, user_name, last_name, email, phone, user_type, dance_style_id } = req.body;
    let password = sha1(req.body.password);
    let sqlUser = "INSERT INTO `user` set?";
    let sqlDancestyle = "INSERT INTO `dance_style_user` set?";
    let sql = "Select * FROM user";

    console.log(req.body);
    connection.query(sqlUser, { name, user_name, last_name, email, phone, password, user_type }, (error, userResult) => {
        console.log(userResult.insertId);
        let user_id = userResult.insertId;

        connection.query(sqlDancestyle, { dance_style_id, user_id }, (error, danceResult) => {
            res.send("ok");
        });
    });
}

// ACTUALIZAMOS UN USUARIO
// UPDATE USER
controller.updateUser = (req, res) => {
    let user_id = req.params.user_id;
    let { name, user_name, last_name, email, phone, user_type, password, dance_style_id } = req.body;
    let updatesql = "UPDATE user set? WHERE user_id =";
    let updatesql2 = "UPDATE dance_style_user set? WHERE user_id =";
    console.log(req.body)
    connection.query(updatesql + user_id, { name, user_name, last_name, email, phone, password, user_type },
        (err, results) => {
            console.log(results)
            connection.query(updatesql2 + user_id, { dance_style_id }, (error, danceResult) => {
                console.log(danceResult)
                res.send(danceResult);
            });
        })


}

//BORRAR USUARIO(BORRADO LOGICO)
//DELETE USER
controller.deleteUser = (req, res) => {
    let user_id = req.params.user_id;

    let updatesql = "UPDATE user set logical_erase = 1 WHERE user_id =";

    connection.query(updatesql + user_id,
        (err, results) => {
            res.send(results);
        })

}

//Poner img a un usuario
controller.updateFile = (req, res) => {
    let avatar = req.file.originalname;
    let user_id = req.params.user_id;

    let sql = `UPDATE user set? WHERE user_id=${user_id}`
    connection.query(sql, { avatar },
        (err, results) => {
            res.send(results);
        })
}

controller.search = (req, res) => {

    let { user_name, name, last_name, phone, email } = req.body;
    let sqlAll = "SELECT * FROM user WHERE logical_erase = 0";
    let sqlFinal = "";
    console.log(req.body)

    if (user_name != "" && user_name != null) {
        if (sqlFinal == "") {
            sqlFinal = ` AND user_name = "${user_name}"`;
        } else {
            sqlFinal = sqlFinal + `AND user_name = "${user_name}"`;
        }

    }
    if (name != "" && name != null) {
        if (sqlFinal == "") {
            sqlFinal = ` AND name = "${name}"`;
        } else {
            sqlFinal = sqlFinal + ` AND name = "${name}"`;
        }
    }
    if (last_name != "" && last_name != null) {
        if (sqlFinal == "") {
            sqlFinal = ` AND last_name = "${last_name}"`;
        } else {
            sqlFinal = sqlFinal + ` AND last_name = "${last_name}"`;
        }
    }
    if (phone != "" && phone != null) {
        if (sqlFinal == "") {
            sqlFinal = ` AND phone = "${phone}"`;
        } else {
            sqlFinal = sqlFinal + ` AND phone = "${phone}"`;
        }
    }
    if (email != ""  && email != null) {
        if (sqlFinal == "") {
            sqlFinal = ` AND email = "${email}"`;
        } else {
            sqlFinal = sqlFinal + ` AND email = "${email}"`;
        }
    }

    sqlAll = sqlAll + sqlFinal;


    connection.query(sqlAll + sqlFinal,
        (err, results) => {
            console.log(sqlAll)
            res.send(results);
        })
}

module.exports = controller;