import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import TogglableBlogDetails from '../components/TogglableBlogDetails'
import { updateVotesDO, undoVotesDO, deleteBlogDO } from '../redux/blogReducer'


const Home = () => {
  const dispatch = useDispatch()
  const { blogs: blogsDispatched, user } = useSelector(state => state)

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
      comments: blog.comments,
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
      <h2>blogs</h2>
      {user !== null && blogsDispatched.sort((a, b) => b.likes - a.likes).map(blog =>
        <TogglableBlogDetails key={blog.id} blog={blog} likeHandler={() => likeHandler(blog)} deleteHandler={() => deleteHandler(blog.id)} loggedInUser={user.username} />
      )}
    </div>
  )
}

export default Home