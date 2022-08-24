const Todo = require('../models/todoModel');
const User = require('../models/userModel');


// @desc Get all my todos
// @route GET api/todos
// @access private(depends on user id/email)
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc POST NEW TODO
// @route POST api/todos
// @access private(depends on user id/email)
const postTodo = async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please complete the form');
  }

  try {
    const todo = await Todo.create({
      title: req.body.title,
      user: req.user.id
    });

    res.status(200).json(todo);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc UPDATE TODO
// @route UPDATE/PUT api/todos/:id
// @access private(depends on user id/email)
const putTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error('Goal Not Found');
  }

  //check for user 
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //if userid and todo.user do not match, 400
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to do this');
  }

  try {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json(updateTodo);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

};

// @desc DELETE TODO
// @route DELETE api/todos/:id
// @access private(depends on todo/user id/email)
const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    res.status(400);
    throw new Error('Todo Not Found');
  }

  //check for user 
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //if userid and todo.user do not match, 400
  if (todo.user.toString() !== req.user.id) {
    res.status(401).json({ msg: 'Error-User not authorized' });
    throw new Error('User not authorized to do this');
  }
  
  try{
    await todo.remove();
    res.status(200).json({ id: req.params.id });

  } catch ( error ) {
    return res.status(500).json({ message: error.message })
  }
};


module.exports = {
  getTodos,
  postTodo,
  putTodo,
  deleteTodo
}