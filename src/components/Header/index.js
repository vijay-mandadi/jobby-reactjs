import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navbar-logo"
        />
      </Link>
      <ul className="routes-list-container">
        <Link to="/" className="linkitem">
          <li className="route-listitem">Home</li>
        </Link>
        <Link to="/jobs" className="linkitem">
          <li className="route-listitem">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={onLogout}>
        Logout
      </button>
      <ul className="icons-container">
        <li>
          <Link to="/">
            <AiFillHome className="home-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <BsFillBriefcaseFill className="home-icon" />
          </Link>
        </li>
        <FiLogOut className="home-icon" onClick={onLogout} />
      </ul>
    </nav>
  )
}

export default withRouter(Header)
