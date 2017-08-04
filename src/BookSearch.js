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
//TODO: handle duplicates in returned query
//TODO: fix concating book results not in search results after removing originals
// from results 
//TODO: fix shelf selection always empty

/*updateQuery method to keep user's entered query in component's state 
and search for books using the query*/
  updateQuery(q){
    if(q && (this.state.query !== q)) {
      this.setState({query: q}) 
      BooksAPI.search(q,20).then((results) => { 
          this.updateResults(results)
      })
    }
    else if(!q) this.setState({query: q,
    results: []})
  }

/*updateResults method filters existing books from returned search results
and then concats the existing books matched with results to keep their shelf status*/
  updateResults(results){
    if(results){
      if(!results.error) {
        // let existingBooks = results.filter((result) => 
        //   result.id === this.props.books.map((book) => book.id))
        let newBooks = results.filter((result) => 
          result.id !== this.props.books.map((book) => book.id))
        this.setState({results: newBooks
          // results.filter((result) => 
          // result.id !== this.props.books.map((book) => book.id))
        // newBooks.concat(existingBooks)
        })
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