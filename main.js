require("dotenv").config();
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

module.exports = app;
