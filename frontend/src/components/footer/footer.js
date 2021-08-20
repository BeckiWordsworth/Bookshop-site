import React from "react"

class Footer extends React.Component {

  render() {

    return (
      <footer>
        <nav className="footerLinks">
          <a href="#">Contact us</a>
          <a href="#">FAQ</a>
          <div className="logoContainer">
            <img src="booklogo.png" alt="Logo" />
          </div>
          <a href="#">Delivery Info</a>
          <a href="#">Terms & Services</a>
        </nav>
      </footer>
    )
  }

}

export default Footer
