import React from 'react'
import PropTypes from 'prop-types'

//import component Book
import Book from './Book'

class BookShelf extends React.Component {
  static propTypes={
    bookShelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired
  }

  render(){
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book,index)=>(
              <Book
                imageURL={book.imageLinks}
                title={book.title}
                authors={book.authors}
                key={book.id}
                id={book.id}
                currentShelf={book.shelf}
                onShelfChange={(shelf)=>{
                this.props.onShelfChange(book.id,shelf)
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf