import React from "react"

class Book extends React.Component {

  // state = {
  //   rating: this.props.rating
  // }

  addStarRating = () => {
    this.props.addStarRating(this.props.id)
  }

  // addStarRating = () => {
  //   const url = `http://localhost:8080/books/${this.props.id}`
  //   fetch(url, {
  //     method: "PUT"
  //   })
  //     .then(res => res.text())
  //     .then(response => {
  //       const currentRating = this.state.rating
  //       this.setState({
  //         rating: currentRating + 1
  //       })
  //       console.log("Success:", this.state.rating)
  //     })
  //     .catch(error => console.error("Error:", error))
  // }

  render() {
    return (
      <div className="productBox">
        <div className="productInfo">
          <div className="imageBox">
            <img src={this.props.image} alt={this.props.name} />
          </div>
          <p className="genre">{this.props.genre}</p>
          <h3>{this.props.title}</h3>
          <p className="author">{this.props.author}</p>
          <div className="previewDescription">
            <p>{this.props.description}</p>
          </div>
        </div>
        <div className="bottomInfo">
          <div className="ratingBox">
            <button className="ratingStar" type="button" onClick={this.addStarRating}>&#9733;</button>
            <p className="ratingNumber">{this.props.rating}</p>
          </div>
          <div className="purchaseInfo">
            <p>{this.props.price} SEK</p>
            <button>Buy</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Book
