const express = require('express');
const router = express.Router();
const tasksController = require("../controller/taskController");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/create", verifyToken, tasksController.createTask);
router.get("/getCreateTask", verifyToken, tasksController.getCreateTaskById);
router.put("/updateTask", verifyToken, tasksController.updateCreateTaskById);
router.delete("/deleteTask", verifyToken, tasksController.deleteTaskById);
router.get("/getAllTasks", verifyToken, tasksController.getAllTasksById);

module.exports = router;