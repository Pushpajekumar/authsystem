require("dotenv").config();
require("./database/database").connect();
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

app.post('/register', async(req, res) => {
try {
  
} catch (error) {
  console.log(error);
}
})

module.exports = app;
