import express from "express";
import Task from "../models/taskModel.js";
const router = new express.Router();

// Creat New Tesk 
router.post('/api/tasks', async (req, res) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const type = req.body.type
        const completed = req.body.completed
        const task = await Task.create({ title, description, type, completed })
        res.status(200).send(task)
    } catch (e) {
        res.status(401).json({ 'error': e.message })
    }
})
// Get Tesks 
router.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})

        res.status(200).send(tasks)
    } catch (e) {
        res.status(401).json({ 'error': e.message })
    }
})
// Get Tesk 
router.get('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })
        if (!task) {
            res.status(403).json({ 'error': "cant find task" })
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(401).json({ 'error': e.message })
    }
})
// Update Tesk 
router.patch('/api/tasks/:id', async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const type = req.body.type
    const completed = req.body.completed
    try {
        let task = await Task.findOneAndUpdate({ _id: req.params.id }, { title, description, type, completed })
        if (!task) {
            res.status(403).json({ 'error': "cant find task" })
        }
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        res.status(401).json({ 'error': e.message })
    }
})
// Delete Tesk 
router.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id })
        if (!task) {
            res.status(403).json({ 'error': "cant find task" })
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(401).json({ 'error': e.message })
    }
})
// Delete Tesks 
router.delete('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.deleteMany({})

        res.status(200).send({ tasks: 'deleted' })
    } catch (e) {
        res.status(401).json({ 'error': e.message })
    }
})
export default router