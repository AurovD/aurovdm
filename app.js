const express = require("express");
const app = express();
const server = require("./server/routes/index");
const api = require("./api/controllers/index");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("views", "./server/views");
app.set("view engine", "pug");
//jhgjlkhkjhkh
app.use("/", server);
app.use("/api", api);

module.exports = app;
