var mysql = require('../node_modules/mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'daancify',
});

connection.connect(
    function(error) {
        if (error) {
            throw error;
        } else {
            console.log("conexion con BD correcta");
        }
    }
);

module.exports = connection;