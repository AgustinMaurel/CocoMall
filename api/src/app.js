/* const setHeaders = require('./utils/middlewares/setHeaders')
const errorHandler = require('./utils/middlewares/errorHandler') */

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require('cors')
const routes = require("./routes/index.js");
 const errorHandler = require("./utils/middlewares/errorHandler.js");
 const setHeaders = require("./utils/middlewares/setHeaders.js");

//Express
const server = express();

//Middlewares

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
/* server.use(setHeaders); */
server.use(cors());
/* server.use(setHeaders());
server.use(errorHandler()); */

//Routing
server.use("/", routes);





module.exports = server;