const express = require('express');
const authRouter = express.Router();


// this route is to create a user
authRouter.post('/register', (req, res) => {res.send("register")});

// this route is to list all users 
authRouter.post('/login', (req, res) => {res.send("login")});

module.exports = authRouter;