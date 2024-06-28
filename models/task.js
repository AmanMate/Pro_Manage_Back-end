const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
        },
        assignee: {
            type: String,
            required: true,
        },
        checklistItems: {
            type: Array,
            required: true,
        },
        dueDate: {
            type: String,
            required: true,
        },
        refUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // This is optional but recommended if you want to establish a reference to the User model
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Task", taskSchema);