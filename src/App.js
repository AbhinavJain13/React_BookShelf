import React, { Component } from 'react'
import './App.css';
import * as BooksAPI from './utils/BooksAPI'
import {  Route } from 'react-router-dom'
//import components
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'

class App extends Component {
  state= {
    books: [],
    showSearchPage: true
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => 
      this.setState({ books }))
  }

  componentDidMount() {
    this.fetchBooks()
  }

  updateBookAcrossShelves = (id,shelf) => {
    BooksAPI.update({id},shelf).then (()=>{
      this.fetchBooks()

    })
  }

  render() {
    return (
      <div className="App">
        <div>
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onShelfChange={(id,shelf)=>{  
                  this.updateBookAcrossShelves(id,shelf)
                }
              }
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
              alreadyOnShelfBooks={this.state.books}
              onShelfChange={(id,shelf)=>{
                this.updateBookAcrossShelves(id,shelf)
                }
              }
          />
        )}/>
       </div>
      </div>
    )
  }
}


export default App