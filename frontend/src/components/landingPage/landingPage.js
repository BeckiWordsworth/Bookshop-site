import React from "react"
import Book from "./book"
import Header from "../header/header.js"
import Footer from "../footer/footer.js"

class LandingPage extends React.Component {

  state = {
    books: [],
    topBooks: [],
    searchBookTitle: "",
    skip: 0
  }

  componentDidMount() {
    const url = "http://localhost:8080/books"
    this.getData(url)
    const topUrl = "http://localhost:8080/books/top"
    this.getTopData(topUrl)
  }

  // puts user's title search query into url for get request for all matching books
  onSearch = event => {
    event.preventDefault()
    const url = "http://localhost:8080/books?title=" + this.state.searchBookTitle
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({
          books: json
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

//pagination button
  loadMore = () => {
      this.state.skip +=12
      const url = "http://localhost:8080/books?skip=" + this.state.skip
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.setState({
            books: json,
            skip: this.state.skip
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

//reset data button
  resetdata = () => {
    const url = "http://localhost:8080/books"
    this.getData(url)
  }


  // clears search input field and uses getData function to make get request
  // for all books again
  clearSearch = event => {
    event.preventDefault()
    const url = "http://localhost:8080/books"
    this.getData(url)
    this.setState({
      searchBookTitle: ""
    })
  }


  // this is the get request for getting all books on page
  getData = url => {
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({
          books: json
        }, console.log(json))
      })
      .catch(error => {
        console.log(error)
      })
  }

  getTopData = topUrl => {
    fetch(topUrl)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({
          topBooks: json
        }, console.log(json))
      })
      .catch(error => {
        console.log(error)
      })
  }

  // uses the book id passed up from child book component and sends put request
  // to update book's rating, then sends another get request to get latest get data
  // (including new rating) for all books
  addStarRating = id => {
    const url = `http://localhost:8080/books/${id}`
    fetch(url, {
      method: "PUT"
    })
      .then(res => res.text())
      .then(response => {
        const url = "http://localhost:8080/books"
        this.getData(url)
        const topUrl = "http://localhost:8080/books/top"
        this.getTopData(topUrl)
      })
      .catch(error => console.error("Error:", error))
  }

  render() {
    if (this.state.books.length > 0) {
      return (
        <div>
          <Header />
          <div className="pageContent">
            <div className="searchBookArea">
              <form className="searchBookForm" onSubmit={this.onSearch}>
                <label htmlFor="search">Search books: </label>
                <input id="search" type="text" value={this.state.searchBookTitle} placeholder="by title" onChange={event => this.setState({ searchBookTitle: event.target.value })} />
                <div className="searchBookButtons">
                  <button type="submit">Search</button>
                  <button type="text" onClick={this.clearSearch}>Clear</button>
                </div>
              </form>
            </div>
            <h2>Top-rated Books</h2>
            <div className="topRatedProductBlock">
              {this.state.topBooks.map((book, index) => {
                if (book.title.length > 30) {
                  book.title = `${book.title.substring(0, 30)}...`
                }
                return (
                  <Book
                    key={index}
                    id={book._id}
                    title={book.title}
                    genre={book.genre}
                    price={book.price}
                    image={book.image}
                    rating={book.rating}
                    author={book.author}
                    addStarRating={this.addStarRating} />
                )
              })}
            </div>
            <h2>All Books</h2>
            <div className="numberOfProducts">
              <p>Showing ({this.state.books.length})</p>
            </div>
            <div className="productBlock">
              {this.state.books.map((book, index) => {
                if (book.title && book.title.length > 40) {
                  book.title = `${book.title.substring(0, 40)}...`
                }
                if (book.description && book.description.length > 140) {
                  book.description = `${book.description.substring(0, 140)}...`
                }
                return (
                  <Book
                    key={index}
                    id={book._id}
                    title={book.title}
                    genre={book.genre}
                    price={book.price}
                    image={book.image}
                    description={book.description}
                    rating={book.rating}
                    author={book.author}
                    addStarRating={this.addStarRating} />
                )
              })}
            </div>
          </div>
          <div className="paginationButtons">
            <button onClick={this.loadMore} type="submit">Load more</button>
            <button onClick={this.resetdata} type="submit">Reset Books</button>
          </div>

          <Footer />
        </div>
      )
    } else {
      return (
        <div>
        Books loading...
        </div>
      )
    }
  }

}

export default LandingPage
