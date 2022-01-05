// ex7.16
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { loginDO } from '../redux/userReducer'

const Header = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state)


  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.clear()
    dispatch(loginDO(null))
    navigate('/')
  }


  return (
    <header>
      {user !== null && <div>Hello, {user.username}</div>}

      {user !== null && <button onClick={logoutHandler}>Logout</button>}
      <nav>
        <ul style={{ display: 'flex', gap: 30 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header