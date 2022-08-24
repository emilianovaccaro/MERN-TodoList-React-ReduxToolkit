import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../redux/features/auth/authSlice';
import Spinner from '../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
    
  }, [user, isError, isSuccess, message, navigate, dispatch]);



  //event handlers
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    }

    dispatch(login(userData));
  }


  if (isLoading) {
    return <Spinner />
  }
  
  
  
  return (
    <>
      {/* Title section */}
      <section className="heading">
        <h1>
          <FaSignInAlt /> Sign In 
        </h1>
        <p>Task Manager Platform</p>
      </section>    
      {/* Form section */}
      <section className="form">
        <form onSubmit={handleSubmit}>
          {/* email */}
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              id="email" name="email" 
              value={email} 
              placeholder="enter an email"
              onChange={handleChange}
            />
          </div>
          {/* password */}
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password" name="password" 
              value={password} 
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          {/* Submit button */}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>

    </>
  )
}

export default Login