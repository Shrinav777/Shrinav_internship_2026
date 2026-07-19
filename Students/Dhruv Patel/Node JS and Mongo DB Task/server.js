const express = require('express')
const mongoose = require('mongoose')

const PORT = 3000
const MONGODB_URI = 'mongodb://localhost:27017/taskdb'

const app = express()
app.use(express.json())

mongoose.connect(MONGODB_URI)
    .then(() => 
        console.log('MongoDB connected'))
    .catch((err) => 
        console.error('MongoDB error:', err))

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, default: 'pending' },
    priority: { type: String, default: 'medium' }
})

const Task = mongoose.model('Task', taskSchema)

app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API')
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' })
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({ error: 'Task not found' })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: 'Invalid task id' })
    }
})

app.post('/tasks', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({ error: 'Title is required' })
        }

        const task = new Task({
            title: req.body.title,
            description: req.body.description || '',
            status: req.body.status || 'pending',
            priority: req.body.priority || 'medium'
        })

        const savedTask = await task.save()
        res.status(201).json(savedTask)
    } catch (error) {
        res.status(400).json({ error: 'Failed to create task' })
    }
})

app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) return res.status(404).json({ error: 'Task not found' })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: 'Failed to update task' })
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ error: 'Task not found' })
        res.status(200).json({ message: 'Task deleted' })
    } catch (error) {
        res.status(400).json({ error: 'Invalid task id' })
    }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
