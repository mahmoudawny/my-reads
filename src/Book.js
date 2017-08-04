/*Book class renders each book and its change controls
*/
import React from 'react'

class Book extends React.Component{
/*changeShelf method calls updateBooks props method which translates to 
changeShelf in parents till App component, which changes App state*/ 
    changeShelf(book, shelf){
      this.props.updateBooks(book, shelf)
    }

    render(){
        const {book} = this.props
        return (
                <li>
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
                )
    }
}

export default Book