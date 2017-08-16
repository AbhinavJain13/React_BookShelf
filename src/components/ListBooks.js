import React from 'react'
import { Link } from 'react-router-dom'

//import component BookShelf
import BookShelf from './BookShelf'


class ListBooks extends React.Component {
  

  shelves = [
    {
      id: 'currentlyReading',
      title: 'Currently Reading'
    },
    {
      id: 'wantToRead',
      title: 'Want to Read'
    },
    {
      id: 'read',
      title: 'Read'
    },
  ]
  
  
  onShelfChange=(bookId,currentShelf) =>
  {
    this.props.onShelfChange(bookId,currentShelf)
  }


  render(){
    const { books } = this.props
    const shelves =this.shelves

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { 
              shelves.map((shelf,index)=> (
                <BookShelf
                  bookShelfTitle={shelf.title}
                  key={index}
                  books={books.filter((book) => book.shelf === shelf.id)}
                  onShelfChange={this.onShelfChange}
                />
              )
              )
            }
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks