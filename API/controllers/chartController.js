const connection = require('../config/db');
const controller = {};


// OBTENER TODOS LOS USUARIOS

controller.getCreatedUsers = (_req, res) => {
    let sql = "SELECT count(*) as count FROM user";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}
controller.getActiveUsers = (_req, res) => {
    let sql = "SELECT count(*) as count FROM user WHERE logical_erase = 0";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}
controller.getErasedUsers = (_req, res) => {
    let sql = "SELECT count(*) as count FROM user WHERE logical_erase = 1";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}
controller.getCreatedClasses = (_req, res) => {
    let sql = "SELECT count(*) as count FROM class";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}
controller.getActiveClasses = (_req, res) => {
    let sql = "SELECT count(*) as count  FROM class WHERE logical_erase = 0";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}
controller.getErasedClasses = (_req, res) => {
    let sql = "SELECT count(*) as count  FROM class WHERE logical_erase = 1";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}

controller.getCreatedClasses2020 = (_req, res) => {
    let sql = "SELECT count(*) as count FROM time_table WHERE start_date >= '2020-04-08' AND end_date <= '2020-12-31'";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}

controller.getCreatedTeachers = (_req, res) => {
    let sql = "SELECT count(*) as count FROM user WHERE user_type = 2";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}
controller.getActiveTeachers = (_req, res) => {
    let sql = "SELECT count(*) as count  FROM user WHERE user_type = 2 AND logical_erase = 0";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}
controller.getErasedTeachers = (_req, res) => {
    let sql = "SELECT count(*) as count  FROM user WHERE user_type = 2 AND logical_erase = 1";

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(results[0]);
        }
    })
}

module.exports = controller;