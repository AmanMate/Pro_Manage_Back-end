const Task = require("../models/task");

const createTask = async (req, res, next) => {
    try {
        // const currentUserId = req.currentUserId;
        const {
            title,
            priority,
            assignee,
            checklistItems,
            dueDate,
            userId
        } = req.body;

        if (
            !title ||
            !priority ||
            !assignee ||
            !checklistItems ||
            !dueDate 
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const taskCreated = new Task({
            title,
            priority,
            assignee,
            checklistItems,
            dueDate,
            refUserId: req.currentUserId,
        })

        await taskCreated.save();

        res.json({message: "Task created successfully"});

    } catch (error) {
        next(error);
    }
};

const getCreateTaskById = async (req, res, next) => {
    try {
        const taskId = req.body.taskId;  // Assuming taskId is passed as a route parameter

        if (!taskId) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const taskCreated = await Task.findOne({ _id: taskId, refUserId: req.currentUserId });

        if (!taskCreated) {
            return res.status(400).json({
                errorMessage: "Task not found",
            });
        }

        let isEditable = false;
        const userId = req.body.userId;  // Assuming userId is passed in the request body

        if (taskCreated.refUserId.toString() === userId) {
            isEditable = true;
        }

        res.json({ taskCreated, isEditable: isEditable });

    } catch (error) {
        next(error);
    }
};


const updateCreateTaskById = async (req, res, next) => {
    try {
        const { taskId, title, priority, assignee, checklistItems, dueDate } = req.body;

        // Check if all required fields are present
        if (!taskId || !title || !priority || !assignee || !checklistItems || !dueDate) {
            return res.status(400).json({ errorMessage: "Bad request" });
        }

        // Check if task with given taskId exists
        const isTaskExists = await Task.findOne({ _id: taskId, refUserId: req.currentUserId });

        if (!isTaskExists) {
            return res.status(404).json({ errorMessage: "Task not found" });
        }

        // Update the task
        await Task.findOneAndUpdate(
            { _id: taskId, refUserId: req.currentUserId },
            {
                $set: {
                    title,
                    priority,
                    assignee,
                    checklistItems,
                    dueDate,
                },
            }
        );

        // No need to call isTaskExists.save() here

        // Return success response
        res.json({ message: "Task Updated Successfully", task: isTaskExists });
    } catch (error) {
        next(error);
    }
};


const deleteTaskById = async (req, res, next) => {
    try {
      const taskId = req.body.taskId;
  
      if (!taskId) {
        return res.status(400).json({
          errorMessage: "Bad request",
        });
      }
  
      const isTaskExists = await Task.findOne({ _id: taskId, refUserId: req.currentUserId });
  
      if (!isTaskExists) {
        return res.status(400).json({
          errorMessage: "Bad request",
        });
      }
  
      await Task.deleteOne({ _id: taskId, refUserId: req.currentUserId });
  
      res.json({ message: "Task Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  const getAllTasksById = async (req, res, next) => {
    try {
      const userId = req.currentUserId;
  
      if (!userId) {
        return res.status(400).json({
          errorMessage: "Bad request",
        });
      }
  
      const tasks = await Task.find({ refUserId: userId });
  
      res.json({ tasks });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    createTask,
    getCreateTaskById,
    updateCreateTaskById,
    deleteTaskById,
    getAllTasksById,
}