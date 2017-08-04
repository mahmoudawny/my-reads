/*BookList class renders all current reads (books added to user's shelves) and the search books link
*/
import React from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'

class BookList extends React.Component{
//TODO: Make array for shelves to call the component one time in a map function
    render(){
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
                <Shelf key="currentlyReading" shelf="Currently Reading" books={currentlyReading}
                  updateBooks={(book, shelf) => this.props.updateBooks(book, shelf)}/>
                <Shelf key="wantToRead" shelf="Want to Read" books={wantToRead}
                  updateBooks={(book, shelf) => this.props.updateBooks(book, shelf)}/>
                <Shelf key="read" shelf="Read" books={read}
                  updateBooks={(book, shelf) => this.props.updateBooks(book, shelf)}/>                
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}
}

export default BookList