const connection = require('../config/db');
const controller = {};

// CREAMOS UNA NUEVA CLASSE
// CREATE CLASS
controller.createClass = (req, res) => {
    let teacher_id = req.params.teacher_id;
    let {
        modality,
        price,
        dance_school_id,
        location,
        description,
        class_name,
        start_date,
        end_date,
        start_hour,
        end_hour,
        periodicity,
        level,
        dance_style_id
    } = req.body;
    let sqlClass = "INSERT INTO `class` set?";
    let sqlTimeTable = "INSERT INTO time_table set?"
    let sqlDanceStyleClass = "INSERT INTO dance_style_class set?"
    console.log(req.body)

    connection.query(sqlClass, { modality, teacher_id, price, location, description, dance_school_id, class_name },
        (error, resultsClass) => {
            let class_id = resultsClass.insertId;

            connection.query(sqlTimeTable, { class_id, start_date, end_date, start_hour, end_hour, periodicity },
                (error, resultsTime) => {
                    console.log(dance_style_id)
                    console.log(class_id)
                    console.log(level)
                    connection.query(sqlDanceStyleClass, { dance_style_id, class_id, level },
                        (error, resultsTime) => {
                            console.log(resultsTime)
                            res.send(resultsTime)
                        });
                });
        });
}

//Ver todas las clases
controller.getAllClass = (req, res) => {
    let sql = `SELECT * FROM class,dance_style_class,dance_style,time_table 
    WHERE class.class_id = time_table.class_id 
    AND class.class_id = dance_style_class.class_id 
    AND dance_style.dance_style_id = dance_style_class.dance_style_id 
    AND class.logical_erase = 0`
    connection.query(sql, (err, classes) => {

        res.send(classes);
    })
}

//Ver todas las clases de una fecha para adelante
controller.getClassByDate = (req,res)=>{
    let sql = `SELECT * FROM class,dance_style_class,dance_style,time_table,user
    WHERE class.class_id = time_table.class_id 
    AND class.class_id = dance_style_class.class_id 
    AND dance_style.dance_style_id = dance_style_class.dance_style_id 
    AND class.teacher_id = user.user_id
    AND class.logical_erase = 0 
    AND start_date > NOW() 
    ORDER BY start_date ASC`
    connection.query(sql,(err,classes)=>{
  
      res.send(classes);
    } )
}
//Apuntarte a la clase
controller.getClassRegister = (req,res)=>{
    let {class_id , user_id} = req.body;
    let resgitration_date = new Date();
    let sql = `INSERT INTO class_user set?`
    connection.query(sql,{class_id , user_id,resgitration_date},(err,classes)=>{
  
      res.send("ok");
    } )
}
//Ver las clases en la que esta apuntado un alumno
controller.getClassSignUp = (req,res)=>{
    let user_id = req.params.user_id;
    let sql = `select * from class_user,class,time_table,dance_style_class,dance_style 
    WHERE class_user.class_id = class.class_id 
    AND class.class_id = time_table.class_id 
    AND dance_style_class.class_id = class.class_id 
    AND dance_style.dance_style_id = dance_style_class.dance_style_id 
    AND class_user.user_id = ${user_id} 
    AND class.logical_erase = 0 
    AND start_date >= NOW() 
    ORDER BY start_date ASC`
    connection.query(sql,(err,classes)=>{
  
      res.send(classes);
    } )
}

//Quitarme de una clase
controller.deleteClassSignUp = (req,res) =>{
    let {user_id,class_id} = req.body;
    let sql = `DELETE FROM class_user 
    WHERE user_id = ${user_id}
    AND class_id = ${class_id}`
    connection.query(sql,(err,deleteSignUp)=>{
        res.send(deleteSignUp)
    })
}

controller.seeRegister = (req,res)=>{
    let {user_id,class_id} = req.body;
    let sql = `SELECT * FROM class_user 
    WHERE user_id = ${user_id}
    AND class_id = ${class_id}`
    connection.query(sql,{user_id,class_id},(err,classes)=>{
  
      res.send(classes);
    } )
}

//EDITAMOS CLASSE
controller.editClass = (req, res) => {
    let class_id = req.params.class_id;
    let sql = `SELECT * FROM class,dance_style_class,dance_style,time_table 
    WHERE class.class_id = time_table.class_id 
    AND class.class_id = dance_style_class.class_id 
    AND dance_style.dance_style_id = dance_style_class.dance_style_id 
    AND class.class_id = ${class_id} 
    AND class.logical_erase = 0`
    connection.query(sql, (err, classes) => {

        res.send(classes);
    })
}

// UPDATE CLASS
controller.updateClass = (req, res) => {
    let class_id = req.params.class_id;
    let {
        modality,
        price,
        dance_school_id,
        location,
        description,
        class_name,
        start_date,
        end_date,
        start_hour,
        end_hour,
        periodicity,
        dance_style_id,
        level
    } = req.body;

    let sqlClass = `UPDATE class set ? WHERE class_id = ${class_id} AND logical_erase = 0`;
    let sqlTimeTable = `UPDATE time_table set ? WHERE class_id = ${class_id} AND logical_erase = 0`
    let sqlDanceStyleClass = `UPDATE dance_style_class set ? WHERE class_id = ${class_id}`



    connection.query(sqlClass, { modality, price, location, description, dance_school_id, class_name },
        (error, resultsClass) => {
            
            connection.query(sqlTimeTable, { start_date, end_date, start_hour, end_hour, periodicity },
                (error, resultsTime) => {
              

                    connection.query(sqlDanceStyleClass, { dance_style_id,level },
                        (error, resultsDance) => {
                        
                        });
                });
        });



}


//BORRAR CLASSE (BORRADO LOGICO)
//DELETE CLASS
controller.deleteClass = (req, res) => {
    let class_id = req.params.class_id;

    let updatesql = "UPDATE class set logical_erase = 1 WHERE class_id =";

    connection.query(updatesql + class_id,
        (err, results) => {
            res.send(results);
        })

}

//Ver todos los estilos de bailes
//GETDANCE_STYLE
controller.danceStyle = (req, res) => {

    let sql = "SELECT dance_style_id, dance_style_name FROM `dance_style` ";

    connection.query(sql,
        (err, results) => {
            res.send(results);
        })

}


//Ver todas las clases de un profesor
//GetClassTeacher
controller.getClassTeacher = (req, res) => {
    let teacher_id = req.params.teacher_id;
    let sql = `SELECT * FROM class WHERE teacher_id = ${teacher_id}`;
    let sqlAll = `SELECT * FROM class,dance_style_class,dance_style,time_table,user 
    WHERE class.class_id = time_table.class_id 
    AND class.class_id = dance_style_class.class_id 
    AND dance_style.dance_style_id = dance_style_class.dance_style_id 
    AND user.user_id = class.teacher_id
    AND class.teacher_id = ${teacher_id}
    AND class.logical_erase = 0
    AND start_date >= NOW()
    `;
    console.log(teacher_id)
    connection.query(sqlAll,
        (err, results) => {
            res.send(results);
        })
}


// Ver las clases más proximas de un profesor
controller.getClassTeacherTime = (req, res) => {
    let teacher_id = req.params.teacher_id;
    let sql = `SELECT * FROM class WHERE teacher_id = ${teacher_id}`;
    let sqlAll = `SELECT * FROM class,dance_style_class,dance_style,time_table 
    WHERE class.class_id = time_table.class_id 
    AND class.class_id = dance_style_class.class_id 
    AND dance_style.dance_style_id = dance_style_class.dance_style_id 
    AND class.teacher_id = ${teacher_id}
    AND class.logical_erase = 0
    ORDER BY time_table.start_date DESC LIMIT 3
    `;
    console.log(teacher_id)
    connection.query(sqlAll,
        (err, results) => {
            res.send(results);
        })
}

// Ver todas las clases proximas por filtro
controller.getClassFilter = (req, res) => {
 
    let {dance_style_id,class_name,location,start_date,level} = req.body;
    let sqlAll = `SELECT * FROM class,dance_style_class,dance_style,time_table,user 
    WHERE class.class_id = time_table.class_id 
    AND class.class_id = dance_style_class.class_id 
    AND dance_style.dance_style_id = dance_style_class.dance_style_id 
    AND class.teacher_id = user.user_id 
    AND class.logical_erase = 0 
    `;
    let sqlFinal ="";
    console.log(req.body)

    if(dance_style_id != ""){
        if(sqlFinal == ""){
            sqlFinal = ` AND dance_style_class.dance_style_id = ${dance_style_id}`;
        }else{
            sqlFinal = sqlFinal +  `AND dance_style_class.dance_style_id = ${dance_style_id}`;
        }
        
    }
    if(class_name != ""){
        if(sqlFinal == ""){
            sqlFinal = sqlFinal +` AND class.class_name = "${class_name}"`;
        }else{
            sqlFinal =`AND class.class_name = "${class_name}"`;
        }
    }
    if(location != ""){
        if(sqlFinal == ""){
        sqlFinal = ` AND class.location = "${location}"`;
    }else{
        sqlFinal =sqlFinal + ` AND class.location = "${location}"`;
    }
    }
    if(start_date != ""){
        if(sqlFinal == ""){
        sqlFinal = ` AND time_table.start_date = "${start_date}"`;
    }else{
        sqlFinal = sqlFinal + ` AND time_table.start_date = "${start_date}"`;
    }
    }
    if(level != ""){
        if(sqlFinal == ""){
        sqlFinal = ` AND dance_style_class.level = ${level}`;
    }else{
        sqlFinal = sqlFinal + ` AND dance_style_class.level = ${level}`;
    }
    }
    sqlFinal= sqlFinal + " AND start_date > NOW() ORDER BY start_date ASC"
    sqlAll = sqlAll + sqlFinal;

    connection.query(sqlAll ,
        (err, results) => {
            console.log(sqlFinal)
            res.send(results);
        })
}
module.exports = controller;