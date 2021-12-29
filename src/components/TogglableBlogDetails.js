import React, { useState, useImperativeHandle } from "react"


const TogglableBlogDetails = React.forwardRef(({ blog }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display:'none' }
  const showWhenVisible = { display: '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => { return { toggleVisibility } })

  return (
    <div>
      <button onClick={() => setVisible(p => !p)}>{visible ? "Show" : "Hide"}</button>


      {blog.title}
      <div style={visible ? hideWhenVisible : showWhenVisible} >
        by {blog.author}.
        <p>Likes: {blog.likes}</p>
      </div>
      <br />
      <br />

    </div>
  )
})


export default TogglableBlogDetails