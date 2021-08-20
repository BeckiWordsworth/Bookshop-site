import React from "react"
import { Link } from "react-router-dom"
import './header.scss'

class Header extends React.Component {

  render() {
    return (
      <header>
        <div className="logoContainer">
          <img src="booklogo.png" alt="Logo" />
        </div>
        <nav className="headerLinks">
          <Link to="/admin">
            Admin
          </Link>
        </nav>
      </header>
    )
  }
}

export default Header
