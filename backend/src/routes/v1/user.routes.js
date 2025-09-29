const express = require('express');
const userRouter = express.Router();


// this route is to create a user
userRouter.post('/', (req, res) => {res.send("user created")});

// this route is to list all users 
userRouter.get('/', (req, res) => {res.send("users")});

module.exports = userRouter;