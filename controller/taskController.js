const Task = require("../models/task");

const createTask = async (req, res, next) => {
    try {
        const currentUserId = req.currentUserId;
        const {
            title,
            priority,
            assignee,
            checklistItems,
            dueDate,
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
            refUserId: currentUserId,
        })

        await taskCreated.save();

        res.json({message: "Task created successfully"});

    } catch (error) {
        next(error);
    }
};

const getCreateTaskById = async (req, res, next) => {
    try {
        const { taskId, userId } = req.params;

        if (!taskId) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

    const taskCreated = await Task.findById(taskId);

    if (!taskCreated) {
        return res.status(400).json({
            errorMessage: "Bad request",
        });
    }

    let isEditable = false;

    if (taskCreated.refUserId.toString() === userId){
        isEditable = true;
    }

    res.json({ taskCreated, isEditable: isEditable});
    } catch (error) {
        next(error);
    }
};

const updateCreateTaskById = async (req, res, next) => {
    try {
        const taskId = req.params.taskId;
        const {
            title,
            priority,
            assignee,
            checklistItems,
            dueDate,
        } = req.body;

        if(
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

        if (!taskId) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const isTaskExists = await Task.findOne({ _id: taskId });

        if (!isTaskExists) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        await Task.updateOne(
            { _id: taskId },
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
         res.json({ message: "Task Updated Sucessfully"});
    } catch (error) {
        next(error);
    }
};

const deleteTaskById = async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
  
      if (!taskId) {
        return res.status(400).json({
          errorMessage: "Bad request",
        });
      }
  
      const isTaskExists = await Task.findOne({ _id: taskId });
  
      if (!isTaskExists) {
        return res.status(400).json({
          errorMessage: "Bad request",
        });
      }
  
      await Task.deleteOne({ _id: taskId });
  
      res.json({ message: "Task Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  const getAllTasksById = async (req, res, next) => {
    try {
      const userId = req.params.userId;
  
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