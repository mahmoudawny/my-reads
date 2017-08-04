/*Shelf class renders book shelves
*/
import React from 'react'
import Book from './Book'

class Shelf extends React.Component{
//TODO: Add Remove all button
    render(){
        const {books, shelf} = this.props
        return (
              <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelf}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books && (
                        books.map((book) => (
                          <Book key={book.id} book={book} updateBooks={(book, shelf) => this.props.updateBooks(book, shelf)}/>
                        )))}
                    </ol>
                  </div>
                </div>
        )}
}

export default Shelf