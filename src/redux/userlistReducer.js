


const userlistReducer = (state = [], action) => {
  if (action.type === 'INIT_ALL_USERS') {
    console.log('all users:::', action.payload)
    return action.payload
  }
  return state
}

export const initializeUsers = (data) => {
  return { type: 'INIT_ALL_USERS', payload: data }
}

export default userlistReducer