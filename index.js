const express = require('express')
const database = require('./config/database');
require('dotenv').config();
const app = express()
const port = process.env.PORT;

// Cors
var cors = require('cors')

// Cookie parser
const cookieParser = require('cookie-parser')

// routes api v1
const routesApiV1Admin = require('./api/v1/routes/admin/index.route')
const routesApiV1Client = require('./api/v1/routes/client/index.route')

// ===============================================================

// Đọc dữ liệu từ req.body khi dùng API
app.use(express.json());

// Cookie parser
app.use(cookieParser())

// Cors
app.use(cors())

// Connect to the database
database.connect();

// Route api v1
routesApiV1Admin(app);
routesApiV1Client(app);

// ===============================================================

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})