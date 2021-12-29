


import React, {useState} from 'react' 

const BlogForm = ({ createBlog, author }) => {
  const [newBlog, setNewBlog] = useState('') 

  const handleChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: author,
      important: Math.random() > 0.5,
    })

    setNewBlog('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <input
          value={newBlog}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm