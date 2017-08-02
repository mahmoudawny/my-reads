import React from 'react'
import {Link} from 'react-router-dom'
//import SortBy from 'sort-by'
//import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
class BookSearch extends React.Component{
    state = {
      query: '',
      results: []
    }
//TODO: make function in App to be sent as prop to change books in App state and refresh screen (maybe use get again after change)
//TODO: fix warning for setState on unmounted component on clicking back after search(not update)
//TODO: handle duplicates in returned query
//TODO: fix concating book results not in search results after removing originals from results
//TODO: fix issue that opening on search page does not load props
//TODO: fix shelf selection always none
    // componentWillReceiveProps(){
    //   console.log("Search will receive props")
    // }

    // componentWillUpdate(){     
    //   console.log("Search will update")
    // }

//updateQuery: method to keep user's entered query in component's state
  updateQuery(q){
    if(q && (this.state.query !== q)) this.setState({query: q}) 
  }

  updateResults(results){
    if(!results.error) {
      let existingBooks = results.filter((result) => 
        result.id === this.props.books.map((book) => book.id))
      let newBooks = results.filter((result) => 
        result.id !== this.props.books.map((book) => book.id))
      this.setState({results: newBooks.concat(existingBooks)
        // results.filter((result) => 
        // result.id !== this.props.books.map((book) => book.id))
       // newBooks.concat(existingBooks)
      })
    }
    else this.setState({results})
  }

   changeShelf(book, shelf){
      BooksAPI.update(book, shelf).then((books) => {            
              this.setState({books})
      })
      console.log("Search change")
   }

    render(){
      if(this.state.query)
        BooksAPI.search(this.state.query).then((results) => { 
            this.updateResults(results)
        })
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
              <span className="error-message"> No results found.</span>}
            </div>
          </div>
        )
    }
}

export default BookSearch