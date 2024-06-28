const express = require('express');
const router = express.Router();
const tasksController = require("../controller/taskController");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/create", verifyToken, tasksController.createTask);
router.get("/create-task/:taskId/:userId", tasksController.getCreateTaskById);
router.put("/update/:taskId", verifyToken, tasksController.updateCreateTaskById);
router.delete("/task/:taskId", tasksController.deleteTaskById);
router.get("/tasks/:userId", tasksController.getAllTasksById);

module.exports = router;