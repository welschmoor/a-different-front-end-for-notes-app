import axios from 'axios'
const baseUrl = '/api/blogs'
// const baseUrl = 'http://localhost:3003/api/blogs'

let token = null  // add this on top
const setToken = newToken => { token = `bearer ${newToken}` }


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// ex 5.8
const updateLikes = async (id, updatedBlog) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

// ex 5.10
const deleteBlog = async id => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, updateLikes, deleteBlog }