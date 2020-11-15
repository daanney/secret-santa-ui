import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

import React from 'react'
import SnowStorm from 'react-snowstorm'
import Header from './components/header.c'

import InfoPage from './pages/info.p'
import LoginPage from './pages/login.p'
import SettingsPage from './pages/settings.p'
import YourDrawnNamePage from './pages/your_drawn_name.p'
import MariahCareyVideoCard from './pages/mariah_carey.p'

import { Alert, CardColumns, Col, Container, Row } from "react-bootstrap"

class App extends React.Component {

  //apiBase = 'http://localhost:5000/api/users/'
  apiBase = 'https://secret-santa.eu-central-1.elasticbeanstalk.com/api/users/'
  getApiUrl =(endpoint)=> {
    const { user } = this.state
    const apiToken = user ? `?token=${user.token}` : ''
    return `${this.apiBase}${endpoint || ''}${apiToken}`
  }

  state = {
    user: null,
    allUsers: [],
    connected: false,
    connectionError: '',
    message: { text: null, type: 'success'}
  }

  componentDidMount =()=> {
    this.pingBackend()
    this.checkUserLoggedIn()
    this.fetchAllUsers()
  }

  pingBackend =()=> {
    fetch(this.getApiUrl('ping'))
      .then(resp => resp.text())
      .then(this.handlePing)
      .catch(this.handlePing)
  }

  handlePing =(check)=> {
    const connected = 'pong' === check
    const connectionError = connected ? '' : 'Something is wrong. Check with Dani.'

    this.setState({ ...this.state, connected, connectionError })
    setTimeout(this.pingBackend, connected ? 10000 : 3000)
  }

  checkUserLoggedIn = async () => {
    if(this.isLoggedIn()) return

    const userStr = localStorage.getItem('user')
    // TODO: should get refreshed data
    if(userStr) {
      const user = JSON.parse(userStr)
      this.setState({ 
        ...this.state, 
        user,
        message: { text: `Welcome back ${user.name}!`, type: 'success' }
      })
    }
  }

  isLoggedIn =()=> {
    return !!(this.state.user && this.state.user.token)
  }

  login =(name, password)=> {
    if(this.isLoggedIn()) return

    const options = {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ name, password })
    }

    fetch(this.getApiUrl('login'), options)
      .then(response => response.json())
      .then(user => {
        if(user && user.token) {
          localStorage.setItem('user', JSON.stringify(user))
          this.setState({ 
            ...this.state, 
            user,
            message: { text: `Welcome ${user.name}!`, type: 'success' }
          })
        }
      })
      .catch(error => {
        console.log(error)
        this.setMessage(`Something went wrong.. Try again!`, 'danger')
      })
  }

  logout =()=> {
    if(!this.isLoggedIn()) return
    localStorage.clear()
    this.setState({ 
      ...this.state, 
      user: null,
      message: { text: `You've been logged out.`, type: 'success' }
    })
  }

  onChangePassword =(password)=> {
    if(!this.isLoggedIn()) return

    const options = {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ token: this.state.user.token, password })
    }

    fetch(this.getApiUrl('pwd'), options)
      .then(response => response.json())
      .then(user => {
        console.log(user)
        if(user && user.token) {
          localStorage.setItem('user', JSON.stringify(user))
          this.setState({ 
            ...this.state, 
            user,
            message: { text: `Your password has been changed!`, type: 'success' }
          })
        }
      })
      .catch(error => {
        console.log(error)
        this.setMessage(`Something went wrong.. Try again!`, 'danger')
      })
  }

  userSawDrawnName =()=> {
    if(!this.isLoggedIn()) return
    fetch(this.getApiUrl('saw_assigned'))
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  fetchAllUsers =()=> {
    fetch(this.getApiUrl())
      .then(response => response.json())
      .then(users => this.setState({ ...this.state, allUsers: users }))
      .catch(error => console.log(error))
  }

  setMessage =(text = '', type = '')=> {
    this.setState({ ...this.state, message: { text, type }})
    console.log({text, type})
    if(text && type !== 'danger') {
      setTimeout(() => this.setMessage(), 5000)
    }
  }

  render =()=> {
    const { user, message, connected, connectionError } = this.state

    return <>
      <SnowStorm />
      <Header user={user} isLoggedIn={this.isLoggedIn} logout={this.logout} />
      <Container id='Content' fluid>
        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            {!connected && <Alert variant='warning'>Odota.. Connecting ...</Alert>}
            {connectionError && <Alert variant='danger'>{connectionError}</Alert>}
            {message.text && <Alert dismissible onClose={this.setMessage} variant={message.type}>{message.text}</Alert>}
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            <CardColumns>

              {this.isLoggedIn() 
              ? <SettingsPage {...this.state} onChangePassword={this.onChangePassword} setMessage={this.setMessage} />
              : <LoginPage onLogin={this.login} />}

              <YourDrawnNamePage {...this.state} userSawDrawnName={this.userSawDrawnName} />
              
              <InfoPage />
              <MariahCareyVideoCard />

            </CardColumns>
          </Col>
        </Row>
      </Container>
    </>
  }
}

export default App
