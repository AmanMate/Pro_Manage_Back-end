const mongoose = require("mongoose");

const checklistItemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    }
});

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
            type: [checklistItemSchema],
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
