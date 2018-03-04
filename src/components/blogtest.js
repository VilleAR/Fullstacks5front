import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
const Blog = ({blog}) => {
const like = async (event) => {
  
  const blogObject =  {
    title:blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
  }
  blogService
    .update({blog})
    .then(newBlog => { 
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        newBlog: ''
      })
    })
}

  return (
  <div>
    <Togglable buttonLabel={blog.title}>
    <p> {blog.title} {blog.author}</p>
    <p>{blog.url} </p>
    <p> {blog.likes} likes </p>
    <button onClick = {like()}>Like</button>
    <p> added by {window.localStorage.getItem('loggedNoteappUser')} </p>
    </Togglable>
    
  </div>  
  )
}

export default Blog