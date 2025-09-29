const express = require('express');
const taskRouter = express.Router();

taskRouter.post('/', (req, res) => {res.send("tast created")});

taskRouter.get('/', (req, res) => {res.send("tasks")});

module.exports = taskRouter;