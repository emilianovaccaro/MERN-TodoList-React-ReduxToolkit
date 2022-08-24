const express = require('express');
const router = express.Router();
const { 
  getTodos,
  postTodo,
  putTodo,
  deleteTodo
} = require('../controllers/todoController');
const { protect } = require('../middlewares/auth');


router.get('/', protect, getTodos);
router.post('/', protect, postTodo);
router.put('/:id', protect, putTodo);
router.delete('/:id', protect, deleteTodo);


module.exports = router;
