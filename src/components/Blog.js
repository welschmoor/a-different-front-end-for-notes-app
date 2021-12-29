import React from 'react'
import ToggableBlogDetails from './TogglableBlogDetails'


const Blog = ({ blog }) => (
  <div>
    <ToggableBlogDetails title={blog.title} author={blog.author} likes={blog.likes} />
  </div>
)

export default Blog