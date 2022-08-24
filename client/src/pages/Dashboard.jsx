import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import Spinner from '../components/Spinner';
import { getTodos, reset } from '../redux/features/todos/todoSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading, isError, message } = useSelector((state) => state.todos);

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      return navigate('/login');
    }
    
    dispatch(getTodos())
    
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch]);


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Task Dashboard</p>
      </section>

      <TodoForm />

      <section className="content"> 
        {todos.length >= 1 ? (
          <div className="todos">
            { 
            todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        ) : (
          <p>There is no tasks to show</p>
        )}
      </section>
    </>
  )
}

export default Dashboard