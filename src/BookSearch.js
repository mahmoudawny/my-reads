import React from 'react'
import {Link} from 'react-router-dom'
//import SortBy from 'sort-by'
//import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
class BookSearch extends React.Component{
    state = {
      query: '',
      // result: [],
      books: []
    }
//TODO: remove books from state and make function in App to be sent as prop to change books in App state
//TODO: fix warning for setState on unmounted component
//TODO: why componentWillUpdate keeps firing?
    
    componentWillReceiveProps(){
      this.setState({books: this.props.books})
      // BooksAPI.search(this.state.query).then((books) => {            
      //       this.setState({result: books})
      //     })
      console.log("Search will receive props")
    }

    componentWillUpdate(){
      
      console.log("Search will update")
    }

    //updateQuery: method to keep user's entered query in component's state
    updateQuery(q){
      if(q && (this.state.query !== q)) this.setState({query: q}) 
    }

   changeShelf(book, shelf){
      BooksAPI.update(book, shelf).then((books) => {            
              this.setState({books})
      })
      console.log("Search change")
   }

    render(){
      let results = []
      console.log('result is'+ results)
      if(this.state.query)
        BooksAPI.search(this.state.query).then((books) => {            
           if(!books.error) {
             results = books.map((book) => book)
             console.log('result is'+ results)
             console.log('books is'+ books)
           }
          else results = books
        })
      console.log('result is'+ results)
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
                {!results.error && (               
                  results.map((book) => (
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
              {results.error &&
              <span className="error-message"> No results found.</span>}
            </div>
          </div>
        )
    }
}

export default BookSearch