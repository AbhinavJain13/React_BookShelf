import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import { Link } from 'react-router-dom'

//import code for backend functionality
import * as BooksAPI from '../utils/BooksAPI'
import DebounceInput from 'react-debounce-input'

//import component BookShelf
import BookShelf from './BookShelf'

class SearchBooks extends React.Component {
  state = {
    books: [],
    query: ''
  }


  static propTypes = {
    alreadyOnShelfBooks: PropTypes.arrayOf(PropTypes.shape(
      {
      authors: PropTypes.arrayOf(PropTypes.string.isRequired),
      title: PropTypes.string.isRequired,
      imageLinks: PropTypes.object.isRequired,
      currentShelf: PropTypes.string,
      bookId: PropTypes.string,
      })),
    onShelfChange: PropTypes.func.isRequired
  }

assignShelves = (searchedBooks,alreadyOnShelfBooks) =>
{        
  searchedBooks= searchedBooks.map(newBook=>
     {
       let matchedBook= alreadyOnShelfBooks.filter ((oldBook)=> 
        {
          return newBook.id === oldBook.id 
        })
        if (matchedBook.length > 0){
          newBook.shelf =matchedBook[0].shelf
        }
          return newBook
      } 

    )
    return searchedBooks
} 
   
  updateBookQuery = (event) => {
      const value = event.target.value.trim()
      this.setState({query: value})
      if (value.length !== 0) {
        BooksAPI.search(value, 10).then((books) => {
          if(books.length>0){
            books = books.filter((book)=>book.imageLinks)
            books = this.assignShelves(books,this.props.alreadyOnShelfBooks)
            this.setState({books})
          }
          else{
            this.setState({books: []})
          }
        })
      } else {
        this.setState({books: [], query: ''})
      }
  }


  render() {
    const {books, query} = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput minLength={2} debounceTimeout={200}
              type="text" placeholder="Search by title or author"
              value={query} onChange={this.updateBookQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
            {!!this.state.query && books.length > 0 && (
            <BookShelf bookShelfTitle="Search Results" 
                books={books}                       
                onShelfChange={  (bookId, currentShelf) =>
                  {
                    this.props.onShelfChange(bookId, currentShelf)
                  }
                }
            />
            )}
      </div>
   )
  }
}

export default SearchBooks

