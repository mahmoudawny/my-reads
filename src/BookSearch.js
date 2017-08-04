/*BookSearch class renders search results
*/
import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
//import SortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class BookSearch extends React.Component{
    state = {
      query: '',
      results: []
    }
//TODO: handle duplicates in returned query (e.g. search for React)

/*updateQuery method to keep user's entered query in component's state 
and search for books using the query*/
  updateQuery(q){
    if(q && (this.state.query !== q)) {
      this.setState({query: q}) 
      BooksAPI.search(q).then((results) => { 
          this.updateResults(results)
      })
    }
    else if(!q) this.setState({query: q,
    results: []})
  }

/*updateResults method removes user's shelved books from returned search results
and then adds the rest of the results to the existing books to keep their shelf statuses*/
  updateResults(results){
    if(results){
      if(!results.error) {
          let existingBooks = this.props.books.filter((book) => 
            results.map((result) => result.id).indexOf(book.id) >= 0)
          let newBooks = results.filter((result) => 
            this.props.books.map((book) => book.id).indexOf(result.id) === -1)
          this.setState({results: existingBooks.concat(newBooks)})
      }
      else this.setState({results})
    } 
  }

  render(){     
      return (
            <div className="search-books" ref="search">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                  value={this.state.query}
                  type="text"
                  placeholder="Search by title or author"
                  onChange={(event) => this.updateQuery(event.target.value)}/>                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"> 
                {!this.state.results.error && (               
                  this.state.results.map((book) => (
                    <Book key={book.id} book={book} updateBooks={(book, shelf) => this.props.updateBooks(book, shelf)}/>
                  )))}
              </ol>
              {this.state.results.error &&
              <span className="error-message"> No results found for the specified search criteria.</span>}
            </div>
          </div>
        )
    }
}

export default BookSearch