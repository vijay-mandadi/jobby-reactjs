import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isShowErr: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      this.setState({isShowErr: false, errMsg: ''})
      history.replace('/')
    } else {
      this.setState({isShowErr: true, errMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errMsg, isShowErr} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <form className="form-container" onSubmit={this.submitDetails}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="username-container">
            <label htmlFor="username" className="form-label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              className="user-input"
              onChange={this.onChangeUsername}
              value={username}
              id="username"
            />
          </div>
          <div className="username-container">
            <label htmlFor="password" className="form-label">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="user-input"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-btn">
              Login
            </button>
            {isShowErr && <p className="error-msg">*{errMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
