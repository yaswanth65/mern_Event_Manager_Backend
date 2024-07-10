const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// POST: Create a new task
router.post("/", async (req, res) => {
    const { task, note, dueDate, completed } = req.body;

    try {
        const userAdded = await User.create({ task, note, dueDate, completed });
        res.status(201).json(userAdded);
        console.log(userAdded);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET: Get all tasks
router.get('/', async (req, res) => {
    try {
        const allTasks = await User.find();
        res.status(200).json(allTasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET: Get a single task by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const singleTask = await User.findById(id);
        if (!singleTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(singleTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete a task by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await User.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH: Update a task by ID
router.patch("/:id", async(req, res)=> {
    const { id } = req.params;
    const { task, note, dueDate, completed } = req.body;
    try {
        const updatedTask = await User.findByIdAndUpdate(id, { task, note, dueDate, completed }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
