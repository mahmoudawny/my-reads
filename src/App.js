import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookList from './BookList'
import BookSearch from './BookSearch'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //books list of book literals where each book has id, name, author and shelf (read, reading, want to)
    books: []
  }
  
  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <BookSearch books={this.state.books} />
        }/>
        <Route exact path='/' render={() => 
          <BookList />
        }/>
      </div>
    )
  }
}

export default BooksApp
