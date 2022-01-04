
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import userlistService from '../services/userlist'
import { initializeUsers } from '../redux/userlistReducer'


const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { user } = useSelector(state => {
    return {
      user: state.userlist.find(e => e.id === id),
    }
  })

  useEffect(() => {
    userlistService.getAllUsers().then(res => {
      dispatch(initializeUsers(res))
    })
  }, [id])


  return (
    <div>
      <h2>User Details</h2>
      {user?.username}
      <h3>All blogs by {user?.username}</h3>
      <ul>
        {user && user.blogs.map(e => {
          return (
            <li key={e.id}>{e.title}</li>
          )
        })}
      </ul>
    </div>
  )
}


export default User