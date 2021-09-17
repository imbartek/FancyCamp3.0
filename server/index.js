const express = require("express");
const app = express();
const port = 3001;
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { response } = require("express");
const saltRounds = 10;
const fileUpload = require("express-fileupload");

//app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 100000,
  })
);

/*app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))*/

app.get("/", (req, res) => {
  res.send("Hello");
  connectWithDB();
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "fancycamp",
});

let dbcreated = false;

//register
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

//login
/*app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    }
    else {
        res.send({ loggedIn: false});
    }
});*/

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            //req.session.user = result;
            //console.log(req.session.user);
            res.send(result);
            console.log(result);
          } else {
            res.send({ message: "Wrong username/password" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

//connect with mysql and create database
const connectWithDB = () => {
  console.log(dbcreated);
  db.query("CREATE DATABASE IF NOT EXISTS fancycamp");
  dbcreated += true;
  console.log(dbcreated);

  setTimeout(() => {
    if (dbcreated === 1) {
      createTable();
    }
  }, 3000);
};
//create table
const createTable = () => {
  const dbb = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "fancycamp",
  });
  dbb.query(
    "CREATE TABLE IF NOT EXISTS `users` (`id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, `username` VARCHAR(30) NOT NULL, `password` VARCHAR(60), `role` VARCHAR(10))",
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Table users created");
      }
    }
  );

  dbb.query(
    "CREATE TABLE IF NOT EXISTS `posts` (`id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, `thumbnail` VARCHAR(50), `title` VARCHAR(30), `slug` VARCHAR(30), `sub_title` VARCHAR(30), `details` VARCHAR(100), `created_at` DATE)",
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Table posts created");
      }
    }
  );

  dbb.query(
    "CREATE TABLE IF NOT EXISTS `gallery` (`id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, `link` VARCHAR(200), `title` VARCHAR(30))",
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Table gallery created");
      }
    }
  );

  dbb.query(
    "CREATE TABLE IF NOT EXISTS `calendar` (`id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, `name` VARCHAR(30), `surname` VARCHAR(50), `phone` VARCHAR(9), `fromDate` DATE, `toDate` DATE, `status` varchar(20))",
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
};

//show gallery
app.get("/show_gallery", (req, res) => {
  const id = req.id;

  db.query("SELECT * FROM gallery", (err, result) => {
    if (err) {
      console.log(err);
    }
    /*if (result.length > 0) {
                res.send(result);
                console.log(result);
            }*/
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.send({ message: "Gallery not found." });
    }
  });
});

//add date
app.post("/add_date", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const phone = req.body.phone;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  db.query(
    "INSERT INTO calendar (name, surname, phone, fromDate, toDate, status) VALUES (?,?,?,?,?,'white')",
    [name, surname, phone, fromDate, toDate],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "Coś poszło nie tak." });
      } else {
        res.send({ message: "Zarezerwowano wybrany termin!" });
      }
    }
  );
});

//show reservations
app.get("/show_reservation", (req, res) => {
  db.query("SELECT * FROM calendar", (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result);
      res.send(result);
    }
  });
});

//update reservation status
app.post("/change_status", (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  db.query(
    "UPDATE `calendar` SET `status`= ? WHERE id = ?",
    [status, id],
    (err, reuslt) => {
      if (err) {
        console.log(err);
        res.send({ message: "Coś poszło nie tak." });
      } else {
        res.send({ message: `Zmieniono status na ${status}` });
      }
    }
  );
});

//upload files
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      database : 'fancycamp'
    }
  });
app.use(fileUpload());

app.post("/upload", async (req, res) => {
  const {name, data} = req.files.file;
  if(name && data) {
    await knex.insert({name: name, image: data}).into('pics');
      res.sendStatus(200);
  }
  else{
      res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`App started at: ${port}`);
});
