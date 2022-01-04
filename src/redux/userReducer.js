
// exercise 7.12

const userReducer = (state = null, action) => {
  if (action.type === 'LOGIN') {
    return action.payload.user
  }
  return state
}

export const loginDO = (user) => {
  return { type: 'LOGIN', payload: { user } }
}

export default userReducer