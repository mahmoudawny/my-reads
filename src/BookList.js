import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookList extends React.Component{
    state = {

    }

    // onComponentDidMount(){

    // }

    // onComponentWillUpdate(){
    //   this.props.updateBooks()
    //   console.log("Book list will update")
    // }

    changeShelf(book, shelf){
      BooksAPI.update(book, shelf).then((books) => {            
              this.setState({books})
      })   
      console.log("Book list change")
    }

    render(){
        //TODO: <BookShelf books={this.state.books} updateStatus={this.onChangeStatus} shelfLabel='currentlyReading' title='Currently Reading' />            <BookShelf books={this.state.books} updateStatus={this.onChangeStatus} shelfLabel='wantToRead' title='Want to Read' />          <BookShelf books={this.state.books} updateStatus={this.onChangeStatus} shelfLabel='read' title='Read'/>
        //TODO: make function in App to be sent as prop to change books in App state
        //TODO: fix onchange not working
        //TODO: fix shelf selection always currentlyReading
        const {books} = this.props
        let currentlyReading = books.filter((book) => (
          book.shelf === "currentlyReading"))
        let read = books.filter((book) => (
          book.shelf === "read"))
        let wantToRead = books.filter((book) => (
          book.shelf === "wantToRead"))
        return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currentlyReading && (
                        currentlyReading.map((book) => (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     {wantToRead && (
                        wantToRead.map((book) => (
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
                      </li>)))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {read && (
                        read.map((book) => (
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
                      </li>)))}                     
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}
}

export default BookList