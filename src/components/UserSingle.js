
import React from 'react'
// import { Link } from 'react-router-dom'


const UserSingle = ({ user }) => {
  return (
    <div>
      {user.username}
      <span>Number of Blogs: {user.blogs.length}</span>
    </div>
  )
}

export default UserSingle