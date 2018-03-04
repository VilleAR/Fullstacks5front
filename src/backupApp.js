import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { ToastContainer, toast } from 'react-toastify'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      username:'',
      password:'',
      user: null,
      newAuthor: null,
      newUrl: null,
      
    }
  }
  notify1 = () => toast("Logged in")
  notify2 = () => toast("Blog created")
  notify3 = () => toast("Wrong username or password")
  notify4 = () => toast("Logged out")

  

  componentDidMount() {
    this.notify1()
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
    
  } 
  
  
  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.notify3()
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',       
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  logout = async (event) => {
    window.localStorage.removeItem('loggedNoteappUser')
    this.notify4()
    this.setState({user:null})
    
  }

  addBlog = (event) => {
    
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlog,
      author: this.state.newAuthor,
      url: this.state.newUrl
    }
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: ''
        })
        this.notify2()
      })
      
  }
  
  handleBlogChange = (event) => {
    this.setState({ newBlog: event.target.value })
  }
  handleAuthorChange = (event) => {
    this.setState ({ newAuthor: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }
  handleUrlChange = (event) => {
    this.setState({ url: event.target.value})
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }
  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  


  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h1>Log in to application </h1>
          <form onSubmit={this.login}>
            <div>
              username:
              <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              />
            </div>
            <div>
              password:
              <input
              type="text"
              value={this.state.password}
              onChange={this.handlePasswordChange} 
              />    
            </div>     
            <button type="submit">kirjaudu </button>
            
          </form>
        </div>
      )
    } else {
      return (
        <div>         
          <button onClick={this.logout}>Log out</button>
          <h2>blogs</h2>
          <p> {this.state.user.name} logged in </p>
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )} 
          <h2> New blog: </h2>
          
          <form onSubmit={this.addBlog}>           
            <div>
              title:
              <input
                value={this.state.newBlog}
                onChange={this.handleBlogChange}
              />
            </div>
            <div>
              author:             
              <input 
              value={this.state.newAuthor}
              onChange={this.handleAuthorChange}
              />
            </div>
            <div>
              url: 
              <input
              value={this.state.newUrl}
              onChange={this.handleUrlChange}
              />
            </div>
            <button type ="submit">save</button>
            <ToastContainer />
          </form>        
        </div>
      );      
    }   
  }
}


export default App;
