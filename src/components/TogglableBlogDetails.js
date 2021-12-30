import React, { useState, useImperativeHandle } from 'react'
import blogService from '../services/blogs'


/// exercise 5.7 forwardRef is actually not needed
const TogglableBlogDetails = React.forwardRef(({ blog, likeHandler, deleteHandler, loggedInUser }, ref) => {
  console.log(blog)
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: 'none' }
  const showWhenVisible = { display: '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => { return { toggleVisibility } })

  // Likes



  return (
    <div style={blogStyle} className="blogdiv" >
      <span className="blogtitle" >{blog.title}</span>
      <button onClick={() => setVisible(p => !p)}>{visible ? 'Hide' : 'Show'}</button>


      <div style={visible ? showWhenVisible : hideWhenVisible} className="likesDiv">
        by {blog.author}
        <p className='likesParagraph'>Likes: {blog.likes}</p>
        <button onClick={likeHandler} >Like</button>

        {/* only show when author username is the same as logged in user: */}
        {blog.author === loggedInUser && <button onClick={deleteHandler} >Delete</button>}
      </div>
      <br />
      <br />

    </div >
  )
})


TogglableBlogDetails.displayName = 'TogglableBlogDetails'
export default TogglableBlogDetails