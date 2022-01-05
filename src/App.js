import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, createBlogDO } from './redux/blogReducer'
import { loginDO } from './redux/userReducer'
import { Routes, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Header from './components/Header'

import Home from './pages/Home'
import Users from './pages/Users'
import User from './pages/User'
import BlogPage from './pages/BlogPage'


const App = () => {

  const [errorStr, setErrorStr] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { user } = useSelector(state => state)

  const blogFormRef = useRef()

  // Token Check in Local Storage. Exercise 5.2
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginDO(user))
      blogService.setToken(user.token)
    }
  }, [])


  const loginHandler = async (event) => {
    event.preventDefault()
    setErrorStr(null)

    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) //Exercise 5.2

      blogService.setToken(user.token)

      dispatch(loginDO(user))

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorStr('Wrong credentials')
      setTimeout(() => {
        setErrorStr(null)
      }, 5000)
    }
  }

  /////////////////////////////////////////////////////
  //    Forms
  const loginForm = () => (
    <form onSubmit={loginHandler} className='loginform'>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <Togglable buttonLabel="Add new Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} author={user.username} />
    </Togglable>
  )

  const logoutHandler = () => {
    localStorage.clear()
    dispatch(loginDO(null))
  }

  //////////////////////////////////////////////
  // Fetching all blogs ex7.10
  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })
  }, [])


  //////////////////////////////////////////////
  // Add new Blog ex7.10
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        dispatch(createBlogDO(returnedBlog))
      })
  }


  return (
    <div>
      <Header logoutHandlser={logoutHandler} />

      {errorStr && <div className='error'>{errorStr}</div>}

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route exact path="/" element={<Home />} />
      </Routes>

      {user === null && loginForm()}
      <br />
      <br />
      {user !== null && noteForm()}

    </div>
  )
}

export default App