import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../redux/features/todos/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="todo">
      <div>{new Date(todo.createdAt).toLocaleString('en-US')}</div>
      <h2>{todo.title}</h2>
      <button onClick={() => dispatch(deleteTodo(todo._id))} className="close">
        <FaTrashAlt />
      </button>
    </div>
  )
}

export default TodoItem;