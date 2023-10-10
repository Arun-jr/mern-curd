var express = require('express');
const Todo = require('../models/todo');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    const todos = await Todo.find({}).exec()
    res.send(todos);
});


router.post('/', async function (req, res) {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: `${error}  Error creating todo` });
    }
});



router.delete('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        console.log("try")
        const deletedTodo = await Todo.findByIdAndRemove(todoId);
        console.log(deletedTodo)
        if (!deletedTodo) {
            return res.status(404).json({ error: 'todo not found' });
        }
        res.status(200).json({message : "todo deleted"});
    } catch (error) {
        res.status(500).json({ error: `${error}  Error deleting todo` });
    }
});


router.put('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        const data = {data : updatedTodo , message : "todo updated"}

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error updating Todo' });
    }
});




module.exports = router;
