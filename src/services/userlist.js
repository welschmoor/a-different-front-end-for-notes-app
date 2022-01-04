import axios from 'axios'

const baseURL = '/api/users'

const getAllUsers = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const userlistService = { getAllUsers }
export default userlistService