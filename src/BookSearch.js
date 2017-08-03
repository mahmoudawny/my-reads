import React from 'react'
import {Link} from 'react-router-dom'
//import SortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class BookSearch extends React.Component{
    state = {
      query: '',
      results: []
    }
//TODO: fix issue where api.search does not finish but updateResults run with empty object, causing first typed letter to have no results
// and second typed letter to search for results of first letter (try prevState in setstate)
//TODO: handle duplicates in returned query
//TODO: fix concating book results not in search results after removing originals from results
//TODO: fix issue that refreshing search page does not load props 
// (happens if check results existing is removed from update method)
//TODO: fix shelf selection always empty
//TODO: Add book shelf class to this DOM to replace static html



//updateQuery method to keep user's entered query in component's state
  updateQuery(q){
    if(q && (this.state.query !== q)) {
      //try prevState in this setState, merge search call with set query:q
      this.setState({query: q}) 
      BooksAPI.search(this.state.query).then((results) => { 
          this.updateResults(results)
      })
    }
  }

//updateResults method filters existing books from returned search results
// and then concats the existing books matched with results to keep their shelf status
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

  changeShelf(book, shelf){
    this.props.updateBooks(book, shelf)
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
                  <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          {book.imageLinks && (
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          )}
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(event) => this.changeShelf(book, event.target.value)}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
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