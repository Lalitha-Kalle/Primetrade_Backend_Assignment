const express = require('express');
const userRouter = express.Router();

userRouter.post('/', (req, res) => {res.send("user created")});

userRouter.get('/', (req, res) => {res.send("users")});

module.exports = userRouter;