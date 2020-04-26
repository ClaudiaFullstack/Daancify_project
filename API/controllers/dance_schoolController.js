const connection = require('../config/db');
const controller = {};


//VER TODAS LAS  ESCUELA DE DANZA
//GET  school_dances
controller.getSchoolDances = (req, res) => {

    let sql = `SELECT * FROM dance_school JOIN user on dance_school.owned_by_user_id = user.user_id`;

    connection.query(sql,
        (err, results) => {
            res.send(results);
        })
}


//VER TODAS LAS  ESCUELA DE DANZA CREADAS POR UN PROFESOR
//GET  school_dances
controller.getSchoolDancesbyTeacher = (req, res) => {
    let owned_by_user_id = req.params.owned_by_user_id;
    console.log(owned_by_user_id)
    let sql = `SELECT * FROM dance_school WHERE dance_school.owned_by_user_id = ${owned_by_user_id} and dance_school.logical_erase = 0
  `;

    connection.query(sql,
        (err, results) => {
            res.send(results);
        })
}

//CREAR UNA ESCUELA DE DANZA
//CREATE school_dance
controller.create = (req, res) => {
        let { owned_by_user_id, dance_school_name, address, description, phone_dance_school, email } = req.body;
        let sql = `INSERT INTO dance_school set?`;
        console.log(req.body)
        connection.query(sql, { dance_school_name, address, description, phone_dance_school, email, owned_by_user_id },
            (err, results) => {
                console.log(results)
                res.send(results);
            })
    }
    //EDITAR UNA ESCUELA DE DANZA
    //EDIT school dance
controller.edit = (req, res) => {
    let dance_school_id = req.params.dance_school_id
    let sql = `SELECT * FROM dance_school WHERE dance_school_id = ${dance_school_id}`;

    connection.query(sql,
        (err, results) => {
            res.send(results);
        })
}

//ACTUALIZAR UNA ESCUELA DE DANZA
//UPDATE school dance
controller.update = (req, res) => {
    let dance_school_id = req.params.dance_school_id;
    let { dance_school_name, address, description, phone_dance_school, email } = req.body;
    let sql = `UPDATE dance_school set ? WHERE dance_school_id = ${dance_school_id}`;

    connection.query(sql, { dance_school_name, address, description, phone_dance_school, email },
        (err, results) => {
            res.send(results);
        })
}

//BORRAR UNA ESCUELA DE DANZA
//DELETE school dance
controller.delete = (req, res) => {
    let dance_school_id = req.params.dance_school_id
    let sql = `UPDATE dance_school SET logical_erase = 1 WHERE dance_school_id = ${dance_school_id}`;

    connection.query(sql,
        (err, results) => {
            console.log(results)
            res.send(results);
        })
}
module.exports = controller;