// individual page for each blog
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { addCommentDO, initializeBlogs } from '../redux/blogReducer'

// coming from previous page of fetched blogs this works but:
// If I refresh this page, the blog is undefined
const BlogPage = () => {
  const { id } = useParams()
  let { blog, user } = useSelector(state => {
    return {
      blog: state.blogs.find(e => e.id === id),
      user: state.user
    }
  })

  const [inputState, setInputState] = useState('')
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!blog) {
  //     blogService.getSingle(id).then(res => {
  //       blog = res
  //     })
  //   }
  // }, [])

  useEffect(() => {
    blogService.getAll().then(res => {
      // dispatch to userlist inside store

      dispatch(initializeBlogs(res))
    })
  }, [dispatch, String(blog)])


  /////////////////////////////////////////////////
  /// Comment
  const submitComment = (e) => {
    e.preventDefault()

    const commentObj = {
      body: inputState,
      username: user.username
    }

    const updatedBlog = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
      comments: [...blog.comments, commentObj]
    }

    blogService
      .updateLikes(blog.id, updatedBlog)
      .then(returnedBlog => {
        dispatch(addCommentDO(blog.id, returnedBlog))
        setInputState('')
      }).catch(error => {
        console.log('AddCommentError:', error.message)
      })
  }


  return (
    <div>
      <h3>{blog && blog.title}</h3>
      <div>Likes: {blog && blog.likes}</div>
      <br />
      <h4>Comments:</h4>
      <form onSubmit={submitComment}>
        <input type="text" placeholder='' onChange={e => setInputState(e.target.value)} value={inputState} />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog?.comments && blog.comments?.map(e => <li key={e._id}>{e.body}</li>)}
      </ul>
    </div>
  )
}

export default BlogPage