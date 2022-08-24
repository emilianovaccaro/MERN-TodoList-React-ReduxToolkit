import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../redux/features/auth/authSlice';
import { FaUserPlus } from 'react-icons/fa';
import Spinner from '../components/Spinner';

// 
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //use effect
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);




  //onChange handle setState(prev => { ...prev, [state]: target.value })
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    });
  }

  //Submit handler => dispatch(register(value))
  const handleSubmit = (e) => {
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name, email, password
      }

      dispatch(register(userData));
    }
    e.preventDefault();
  }

  if (isLoading) {
    return <Spinner />
  }
  
  
  return (
    <>
      {/* Title section */}
      <section className="heading">
        <h1>
          <FaUserPlus /> Register 
        </h1>
        <p>Create an account</p>
      </section>    
      {/* Form section */}
      <section className="form">
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id="name" name="name" 
              value={name} 
              placeholder="enter a username"
              onChange={handleChange}
            />
          </div>
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
          {/* confirm password */}
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password2" name="password2" 
              value={password2} 
              placeholder="confirm password"
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

export default Register;