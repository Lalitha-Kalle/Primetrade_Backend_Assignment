const express = require('express');
const taskRouter = express.Router();


// this route is to create a user
taskRouter.post('/', (req, res) => {res.send("tast created")});

// this route is to list all users 
taskRouter.get('/', (req, res) => {res.send("tasks")});

module.exports = taskRouter;