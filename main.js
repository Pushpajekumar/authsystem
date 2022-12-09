require("dotenv").config();
require("./database/database").connect();
const User = require('./modal/user')
const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

app.post('/register', async(req, res) => {
try {
  // Get all data from the users
  const { firstname, lastname, email, password } = req.body
  //Check all data is present in body if not
  if (!(firstname && lastname && email && password)) {
    res.status(400).send('All fields are required')
  }

  // Check user is allready exist based on Email

  const existingUser = await User.findOne({email})

  if (existingUser) {
    res.status(400).send('User is allready exist')
  }


  // Encryption of password

 const incryptedPassword =  await bcrypt.hash( password, 10)

  //Create User in database
  const user = User.create({
    firstname,
    lastname,
    email,
    password: incryptedPassword
  })

// Generate a token for user and send it

const token = jwt.sign(
  {
    id: user._id,
    email,
  },
  process.env.SECRET,
  {
    expiresIn: '2h'
  }
)

user.token = token,
user.password = undefined,


res.status(201).json(user)

} catch (error) {
  console.log(error);
}
})

app.post('/login', async (req, res) => {
  try {
    const { email, password} = req.body

    if (!(email && password)) {
      res.status(400).send("Email or password is missing")
    }
    const user = await User.findOne({email})
    // assignment -- if user is not avilable

    // Match the password
   if ( user && (await bcrypt.compare(password, user.password))) {
  const token =   jwt.sign({
    id: user._id,
  },
  process.env.SECRET,
  {
    expiresIn: '2h'
  })
  user.token = token
  user.password = undefined


  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user
  })
   }

  } catch (error) {
    console.log(error)
  }
})

module.exports = app;
