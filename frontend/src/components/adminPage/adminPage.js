import React from "react"
import { Link } from "react-router-dom"
import AddBookForm from "./addBookForm"
import SignUpForm from "./signUpForm"
import LogInForm from "./logInForm"

class AdminPage extends React.Component {

  state = {
    isLoggedIn: false,
    newBook: {},
    newBookAdded: false
  }

  postData = () => {
    const url = "http://localhost:8080/books"
    const { newBook } = this.state
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 201) {
          this.setState({
            newBookAdded: true
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  addNewBook = newBook => {
    this.setState({
      newBook
    }, () => { this.postData() })
  }

  checkLogInStatus = status => {
    this.setState({
      isLoggedIn: status
    }, () => { console.log(this.state.isLoggedIn)} )
  }

  render() {
    if(this.state.isLoggedIn) {
      return (
        <div className="pageContentAddNewBook">
          <div className="backButtonContainer">
            <Link to="/"><button className="navigationButtonTop-small">&larr; Back to books</button></Link>
          </div>
          <div className="formsContainer">
            <div className="formBox">
              <AddBookForm addNewBook={this.addNewBook} />
              {this.state.newBookAdded ?
                <p>
                  You've added
                  {" "}
                  {this.state.newBook.title}
                  {" "}
                   to the site. Yay!
                </p>
                :
                <p />
              }
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="pageContentLoginPage">
          <div className="backButtonContainer">
            <Link to="/"><button className="navigationButtonTop-small">&larr; Back to books</button></Link>
          </div>
          <div className="formsContainer">
            <div className="formBox">
              <LogInForm onLogin={this.checkLogInStatus} />
            </div>
            <div className="formBox">
              <SignUpForm onLogin={this.checkLogInStatus} />
            </div>
          </div>
        </div>

      )
    }
  }
}

export default AdminPage
