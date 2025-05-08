const express = require('express');

const router = express.Router();

const taskController = require('../controller/task')

router.post('/add-task', taskController.addNewTask)

router.get('/get-all-tasks', taskController.getAllTasks)

router.delete('/delete-task/:id', taskController.deleteTask)

router.put('/update-task/:id', taskController.updateTask)

module.exports = router