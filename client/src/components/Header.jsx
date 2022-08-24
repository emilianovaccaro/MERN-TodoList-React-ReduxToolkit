import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  
  //logout handler
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }


  return (
    <header className="header">
      <div className='logo'>
        <Link to="/">Task Manager</Link>
      </div>
      <ul>
        { user ? (
          //user logout btn
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt />Logout
            </button>
          </li>
        ) : (
          <>
            {/* user login  */}
            <li>
              <Link to="/login">
                <FaSignInAlt />Login
              </Link>
            </li>
            {/* Register */}
            <li>
              <Link to="/register">
                <FaUserPlus /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header