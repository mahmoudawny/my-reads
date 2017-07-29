import React from 'react'
import {Link} from 'react-router-dom'
import SortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'

class BookSearch extends React.Component{
    state = {
      query: ''
    }

    //updateQuery: 
    updateQuery = (q) => {
      this.setState({query: q})
    }

    render(){
      //retrieve books matched by author or title
        const match = RegExp(escapeRegExp(this.state.query),'i')
        let searchAuthor = this.props.books.filter(book => match.test(book.author))
        let searchTitle = this.props.books.filter(book => match.test(book.title))
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  value={this.state.query}
                  type="text"
                  placeholder="Search by title or author"
                  onChange={(event) => this.updateQuery(event.target.value)}/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchTitle.map(books => 
                <li>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+books.imageLinks.thumbnail+')' }}></div>
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
                      <div className="book-title">{books.title}</div>
                      <div className="book-authors">{books.authors}</div>
                    </div>
                  </li>
                  )}
              </ol>
            </div>
          </div>
        )
    }
}

export default BookSearch