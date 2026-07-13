const express = require('express')
const mongoose = require('mongoose')

const PORT = 3000;

const app = express()

app.use(express.json())

//Connection to DB
mongoose.connect('mongodb://localhost:27017/taskdb')
    .then(()=>{console.log("Connection Sucessful");
    })
    .catch((err)=>{
        console.log("Not connected");
    })

//Creating DB Schema
const task_s = new mongoose.Schema({
    title : {type : String, required: true},
    status : {type : String, default: 'pending'}
})

//Creating a DB Model
const Task = mongoose.model('Task',task_s);

//Server started
app.get("/",(req , res )=>{
    res.send('Welcome to my Task Server')
})

//Send tasks
app.get("/tasks", async (req , res)=>{
    try {
        const allTask = await Task.find();
        res.status(200).json(allTask)
    } catch (error) {
        console.log("GET /tasks error: " + error.message);
        res.status(500).json({
            error :"Failed to fetch tasks"
        })
    }
})

//Create Task
app.post('/tasks', async (req , res)=>{
    try {
        if (!req.body.title) {
            return res.status(400).json({
                error : "Please send some data"
            })
        }

        const newTask = new Task({
            title : req.body.title,
            status : req.body.status || "pending"
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ error : "Failed to store task in db"})
    }
})


//Update task
app.put('/tasks/:id', async (req , res)=>{
    try {
        
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if (!updateTask) {
            return res.status(400).json({error : "Task not found"})
        }

        res.status(200).json(updateTask)
    } catch (error) {
        res.status(500).json({error : "Invalid task"})
    }
})

app.delete('/tasks/:id', async (req , res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)

        if (!deleteTask) {
            return res.status(404).json({ error : "Task not found"})
        }

        res.status(200).json({ message : 'Task deleted'})
    } catch (error) {
        res.status(500).json({error : "Invalid task"})
    }
})


app.listen(PORT, ()=>{
    console.log("App Runinng");
    
})