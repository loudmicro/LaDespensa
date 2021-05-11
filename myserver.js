
var mysql = require('mysql');
var express = require('express');
const path = require('path');
var url = require('url');
var fs = require('fs');

var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());


var con = mysql.createConnection({
  host: secret.MYSQL_HOST,
  user: secret.MYSQL_USERNAME,
  password: secret.MYSQL_PASSWORD,
  database: secret.MYSQL_DB
});

con.connect();


/*
  DEVUELVEN LA WEB
*/

//develve index
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/main.html'));
});

//devuelve insert
app.get('/webInsert', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/insert.html'));
});

//devuelve listarTodo
app.get('/webListAll', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/listAll.html'));
});

app.get('/webListAllEdit', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/listAllEditable.html'));
});


//devuelve web listNeeded
app.get('/webListNeeded', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/listNeeded2.html')); //TODO cambiar a listNeeded
});

//devuelve web listNeeded
app.get('/webTest', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/main2.html')); //TODO cambiar a listNeeded
});

/*
  /DEVUELVEN LA WEB
*/

/*
  DEVUELVE COSAS DE LA BD
*/



//devuelve la lista de categorías
app.get('/categorias', function (request, response) {
  console.log('GET request received at /categorias')
  con.query("SELECT nombre FROM categorias ", function (err, result) {
    if (err) throw err;
    else {
      console.log(result);
      response.json(result)
    }

  });
});




app.post('/addproduct', function (req, res) {
  console.log("------------------------->" + req.body[0].nombre);

  //compruebo si existe

  con.query("INSERT into productos SET ?", req.body, function (err, result) {
    if (err != null && err.code == 'ER_DUP_ENTRY') {

      console.log("Producto existente");
      //si existe lo actualizo 

      const sqlUpdate = 'UPDATE productos SET ? WHERE nombre like ?'
      const data = req.body;

      con.query(sqlUpdate, [data[0], data[0].nombre], function (err, data) {
        if (err != null && err.code == 'ER_DUP_ENTRY') {
          console.log("Producto existente");
        } else if (err) {
          throw err;
        } else {
          console.log("product successfully ");
        }
      });


    } else if (err) {
      throw err;
    } else {
      console.log("product successfully ");
    }
    res.send("Created " + JSON.stringify(result));
  });
  //res.send("Received"+req.body)

});

/*
  /AÑADE COSAS DE LA BD
*/


//UPDATE

app.post('/updateProduct', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);

  //console.log("Recibido: " + req.body.cantidad);
  //const sql = 'UPDATE productos SET cantidad = ? WHERE nombre like ?'

  const sql = 'UPDATE productos SET ? WHERE nombre like ?'
  const data = req.body;

  con.query(sql, [data, data.nombre], function (err, data) {
    if (err != null && err.code == 'ER_DUP_ENTRY') {
      console.log("Producto existente");
    } else if (err) {
      throw err;
    } else {
      console.log("product successfully ");
    }
  });

});

/*
  /AÑADE COSAS DE LA BD
*/

app.get('/all', function (request, response) {
  console.log('GET request received at /all')
  con.query("SELECT * from productos", function (err, result) {
    if (err) throw err;
    else {
      response.json(result)
    }

  });
});


//TODO añadir agotado
app.post('/getCustom', function (req, res) {


  console.log("DATA from AJAX = " + req.body.name);//This was the solution   


  var opcion = req.body.name;
  var sql;

  //console.log('SELECT nombre,cantidad,categoria  FROM productos WHERE categoria = ' + JSON.stringify(opcion));

  switch (opcion) {
    case 'all':
      console.log("Entra por all")
      sql = "SELECT * FROM productos";
      break;
    case "needed":
      console.log("Entra por needed");
      sql = "SELECT * from productos p WHERE cantidad < p.minimo";
      break;
    case "agotado":
      console.log("Entra por agotado");
      sql = "SELECT * from productos p WHERE cantidad = 0";
      break;
    default:
      console.log("Entra por default");
      sql = "SELECT *  FROM productos WHERE categoria = " + JSON.stringify(opcion);
      break;

  }

  con.query(sql, req, function (err, result) {
    if (err) throw err;
    else {
      res.json(result)
    }

  });

});



app.post('/getSearch', function (req, res) {

  console.log("DATA from AJAX = " + req.body.name);//This was the solution   


  let opcion = req.body.name;
  let sql = 'SELECT * FROM productos WHERE nombre like "%' + opcion + '%"';
  console.log(sql);


  //SELECT * FROM productos WHERE nombre LIKE '%lata%';
  
  con.query(sql, req, function (err, result) {
    if (err) throw err;
    else {
      res.json(result)
    }

  });
  

});



app.listen(9000, function () {
  console.log('Connected to port 9000');
});

//TODO SEARCH CON WILDCARDS


