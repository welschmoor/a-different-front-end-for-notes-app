import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, createBlogDO, deleteBlogDO, updateVotesDO, undoVotesDO } from './redux/blogReducer'
import { loginDO } from './redux/userReducer'

import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import TogglableBlogDetails from './components/TogglableBlogDetails'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Users from './pages/Users'


const App = () => {

  const [errorStr, setErrorStr] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const { blogs: blogsDispatched, user } = useSelector(state => state)

  // console.log(blogzz)

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

  /////////////////////////////////////////////////
  /// UPDATE blog likes ex7.11:
  const likeHandler = (blog) => {
    dispatch(updateVotesDO(blog.id))
    console.log('likes btn klacked')
    const updatedBlog = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
    }

    blogService
      .updateLikes(blog.id, updatedBlog)
      .then(returnedBlog => {
        console.log(returnedBlog)
      }).catch(error => {
        console.log(error.message)
        dispatch(undoVotesDO(blog.id))
      })
  }

  // Delete ex7.11
  const deleteHandler = (id) => {
    console.log('delete lkacked')
    blogService.deleteBlog(id)
      .then(() => {
        // setBlogs(prev => {
        //   const updatedBloglist = [...prev.filter(e => e.id !== id)]
        //   return updatedBloglist
        // })
        dispatch(deleteBlogDO(id))

      })
  }

  return (
    <div>
      <Header logoutHandler={logoutHandler} />


      {errorStr && <div className='error'>{errorStr}</div>}
      <h2>blogs</h2>


      {user !== null && blogsDispatched.sort((a, b) => b.likes - a.likes).map(blog =>
        <TogglableBlogDetails key={blog.id} blog={blog} likeHandler={() => likeHandler(blog)} deleteHandler={() => deleteHandler(blog.id)} loggedInUser={user.username} />
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users" element={<Users />} />
      </Routes>

      {user === null && loginForm()}
      {user !== null && noteForm()}

    </div>
  )
}

export default App