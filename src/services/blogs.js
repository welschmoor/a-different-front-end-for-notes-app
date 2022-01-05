import axios from 'axios'
const baseUrl = '/api/blogs'
// const baseUrl = 'http://localhost:3003/api/blogs'

let token = null  // add this on top
const setToken = newToken => { token = `bearer ${newToken}` }


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getSingle = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data

}

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// ex 5.8 does this work for updateLikes?
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

// ex 7.18
// const addComment = async (id, updatedBlog) => {
//   const config = { headers: { Authorization: token } }
//   const url = `/api/blogs/postcomment/${id}`
//   console.log(url)
//   const response = await axios.put(url, updatedBlog, config)
//   return response.data
// }

export default { getAll, create, setToken, updateLikes, deleteBlog, getSingle }