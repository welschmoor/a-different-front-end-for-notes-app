// ex7.16
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = ({ logoutHandler }) => {

  const { user } = useSelector(state => state)


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