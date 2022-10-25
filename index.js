const express = require("express");
const dotenv = require("dotenv");
const employeeRouter = require("./router/employeeRouter");
const contentRouter = require("./router/contentRouter");
const registerRouter = require("./router/registerRouter");
const auth = require("./modules/authModule");

const mongo = require("./connect");

dotenv.config();
mongo.connect();
const app = express();
// to parse req.body, to send the req.body from client to server
app.use(express.json());

app.use("/register",registerRouter);

app.use("/",auth.authenticateUser);


app.use("/employees", employeeRouter);

app.use("/content", contentRouter);

app.listen(process.env.PORT);



