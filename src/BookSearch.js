import React from 'react'
import {Link} from 'react-router-dom'
//import SortBy from 'sort-by'
//import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
class BookSearch extends React.Component{
    state = {
      query: '',
      result: [],
    }

    componentWillUpdate(){
      if(this.state.query)
        BooksAPI.search(this.state.query).then((books) => {            
              this.setState({result: books})
      })
    }

    //updateQuery: method to keep user's entered query in component's state
    updateQuery(q){
      this.setState({query: q}) 
    }

   changeShelf(book, shelf){
      BooksAPI.update(BooksAPI.get(book.id), shelf)
   }

    render(){
      return (
            <div className="search-books">
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
                {!this.state.result.error && (               
                  this.state.result.map((book) => (
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
              {this.state.result.error &&
              <span className="error-message"> No results found.</span>}
            </div>
          </div>
        )
    }
}

export default BookSearch