import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../redux/features/todos/todoSlice';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  //Submit handler => dispatch(register(value))
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodo({title}));
    setTitle('');
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Task</label>
          <input 
            type="text"
            name="title" 
            id="text"
            value={title} 
            onChange={handleChange}
            placeholder="Task Title"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">Add Task</button>
        </div>
      </form>
    </section>
  )
}

export default TodoForm