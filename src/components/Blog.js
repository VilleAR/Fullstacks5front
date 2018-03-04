import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog}) => {


  return (
  <div>
    <Togglable buttonLabel={blog.title}>
    <p> {blog.title} {blog.author}</p>
    <p>{blog.url} </p>
    <p> {blog.likes} likes </p>
    <button>Like</button>
    <p> added by {window.localStorage.getItem('loggedNoteappUser')} </p>
    
    </Togglable>
    
  </div>  
  )
}

export default Blog