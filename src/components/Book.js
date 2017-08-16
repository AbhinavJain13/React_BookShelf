import React from 'react'
import PropTypes from 'prop-types'


class Book extends React.Component {
  static propTypes = 
   {
      authors: PropTypes.array,
      title: PropTypes.string.isRequired,
      imageURL: PropTypes.object,
      currentShelf: PropTypes.string,
      onShelfChange: PropTypes.func.isRequired
    }

  changeShelf = (e) =>
    {
      this.props.onShelfChange(e.target.value)
    }
     
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ 
            backgroundImage: `url(${this.props.imageURL.thumbnail})` 
          }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={this.props.currentShelf || "none" } onChange={this.changeShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        {!!this.props.authors && (
          this.props.authors.map((author,index) =>
            <div key={index} className="book-authors">{author}</div>
          )
        )}     
      </div>
    )
  }
}

export default Book;