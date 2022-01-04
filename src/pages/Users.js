import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import userlistService from '../services/userlist'
import { initializeUsers } from '../redux/userlistReducer'
import { useSelector } from 'react-redux'

import UserSingle from '../components/UserSingle'


const Users = () => {
  const dispatch = useDispatch()
  const userlist = useSelector(state => state.userlist)

  useEffect(() => {
    userlistService.getAllUsers().then(res => {
      // dispatch to userlist inside store
      console.log('res:::', res)
      dispatch(initializeUsers(res))
    })
  }, [dispatch, JSON.stringify(userlist)])



  return (
    <div>
      {userlist.map(e => <UserSingle user={e} key={e.id} />)}
    </div>
  )
}


export default Users