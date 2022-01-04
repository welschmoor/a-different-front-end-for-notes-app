// ex 7.9

const initialState = {
  blogs: [],
  notifications: [],
  user: { name: 'Mike' },
  users: [],
}


const blogReducer = (state = initialState.blogs, action) => {

  if (action.type === 'NEW_BLOG') {
    return [...state, action.payload]
  }
  else if (action.type === 'DELETE_BLOG') {
    return [...state.filter(e => e.id !== action.payload.id)]
  }
  else if (action.type === 'INIT_BLOGS') {
    return action.payload
  }
  else if (action.type === 'VOTE') {
    const noteInQ = state.find(e => e.id === action.payload.id)
    console.log('noteInQ.likes', noteInQ.likes)
    return [...state.filter(e => e.id !== action.payload.id), { ...noteInQ, likes: noteInQ.likes + 1 }]
  }
  else if (action.type === 'UNDO_VOTE') {
    const noteInQ = state.find(e => e.id === action.payload.id)
    console.log('noteInQ.likes', noteInQ.likes)
    return [...state.filter(e => e.id !== action.payload.id), { ...noteInQ, likes: noteInQ.likes - 1 }]
  }

  return state  // default
}


/////////////////////////////////////////////////////////////////////////////////
// action creators. DO means dispatch object
export const initializeBlogs = (data) => {
  return { type: 'INIT_BLOGS', payload: data }
}

export const createBlogDO = (data) => {
  return { type: 'NEW_BLOG', payload: data }
}

export const deleteBlogDO = (id) => {
  return { type: 'DELETE_BLOG', payload: { id } }
}

export const updateVotesDO = (id) => {
  return { type: 'VOTE', payload: { id } }
}

export const undoVotesDO = (id) => {
  return { type: 'UNDO_VOTE', payload: { id } }
}

export default blogReducer