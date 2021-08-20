import React from "react"

class AddBookForm extends React.Component {

  state = {
    author: "",
    description: "",
    genre: "",
    image: "",
    price: "",
    rating: 0,
    title: ""
  }

  onClick = () => {
    this.props.addNewBook(this.state)
  }

  render() {
    return (
      <form className="addNewBookForm">
        <h4>ADD A NEW BOOK</h4>
        <label htmlFor="title">Title: </label>
        <input id="title" type="text" onChange={event => this.setState({ title: event.target.value })} />
        <br />
        <label htmlFor="author">Author: </label>
        <input id="author" type="text" required onChange={event => this.setState({ author: event.target.value })} />
        <br />
        <label htmlFor="genre">Genre: </label>
        <select id="genre" type="text" name="genre" onChange={event => this.setState({ genre: event.target.value })}>
          <option value="" hidden>Select genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Historical Fiction">Historical Fiction</option>
          <option value="Art">Art</option>
          <option value="Classic">Classic</option>
          <option value="Comics">Comics</option>
          <option value="Food">Food</option>
        </select>
        <br />
        <label htmlFor="image">Image URL: </label>
        <input id="image" type="text" onChange={event => this.setState({ image: event.target.value })} />
        <br />
        <label htmlFor="price">Price: </label>
        <input id="price" type="text" onChange={event => this.setState({ price: event.target.value })} />
        <br />
        <label htmlFor="description">Description: </label>
        <input id="description" type="text" onChange={event => this.setState({ description: event.target.value })} />
        <br />
        <button type="button" onClick={this.onClick}>Add new book</button>
      </form>
    )
  }

}

export default AddBookForm
