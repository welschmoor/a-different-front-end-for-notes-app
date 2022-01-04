
import React from 'react'
import { Link } from 'react-router-dom'


// styles
import styled from 'styled-components'

const UserSingle = ({ user }) => {
  return (
    <Grid>
      <div>
        <Link to={`/user/${user.id}`}>{user.username}</Link>
      </div>
      <div>
        <span>{user.blogs.length} blogs</span>
      </div>
    </Grid>
  )
}


const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export default UserSingle