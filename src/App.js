import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
      user: null
    }
  }
  

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 
  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  
  handleNoteChange = (event) => {
    this.setState({ newNote: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
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
    return (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
        
    
  }
}

export default App;
