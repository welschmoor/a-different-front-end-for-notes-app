import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'


import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import TogglableBlogDetails from './components/TogglableBlogDetails'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorStr, setErrorStr] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // const [blogInput, setBlogInput] = useState('')

  // const [newBlog, setNewBlog] = useState({})

  const blogFormRef = useRef()

  // Token Check in Local Storage. Exercise 5.2
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) //Exercise 5.2
      blogService.setToken(user.token)
      setUser(user)
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
    <form onSubmit={loginHandler}>
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
    setUser(null)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  //////////////////////////////////////////////
  // Add new Blog
  // const addNewBlogHandler = async e => {
  //   e.preventDefault()
  //   console.log("clacked add new blog")

  //   try {
  //     const response = await blogService.create(newBlog)
  //     setBlogs([...blogs, response])
  //     setErrorStr('')
  //     setBlogInput('')
  //     setNewBlog({ title: '' })
  //   } catch (error) {
  //     setErrorStr(error.message)
  //     console.log("error in add new Blog handler", error)
  //   }
  // }

  // const inputHandlerNewBlog = e => {
  //   setNewBlog({
  //     id: blogs.length + 1,
  //     title: e.target.value,
  //     author: user.username,
  //     url: "url",
  //     likes: 1,
  //   })
  // }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  return (
    <div>
      <header>
        {user !== null && <div>Hello, {user.username}</div>}

        {user !== null &&<button onClick={logoutHandler}>Logout</button>}
      </header>

      {errorStr && <div>{errorStr}</div>}
      <h2>blogs</h2>
      {/* {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
      {user !== null && blogs.map(blog =>
        <TogglableBlogDetails key={blog.id} blog={blog} />
      )}

      {user === null && loginForm()}

      {user !== null && noteForm()}

      {/* {user !== null && <form onSubmit={addNewBlogHandler} >
        <input type="text" placeholder='new blog entry' onChange={inputHandlerNewBlog} required />
        <button type="submit" >Submit</button>
      </form>} */}
    </div>
  )
}

export default App