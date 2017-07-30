import React from 'react'
import {Link} from 'react-router-dom'
//import SortBy from 'sort-by'
//import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
class BookSearch extends React.Component{
    state = {
      query: '',
      result: []
    }

    //updateQuery: method to keep user's entered query in component's state
    updateQuery = (q) => {
      if(q){
          BooksAPI.search(q).then((books) => {
            //console.log(books)
            this.setState({             
              query: q,
              result: books
            })
          })
        }
        else  this.setState({query: q})
    }

    render(){
      const err = this.state.result.error
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
                {!err && (               
                  this.state.result.map((book) => (
                  <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select>
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
              {err &&
              <span className="error-message"> No results found.</span>}
            </div>
          </div>
        )
    }
}

export default BookSearch