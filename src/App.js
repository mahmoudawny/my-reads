import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookList from './BookList'
import BookSearch from './BookSearch'
class BooksApp extends React.Component {
  state = {
    books: [] 
  }
  
   updateBooks(){
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  componentDidMount(){
    this.updateBooks()
  }


  changeShelf(book, shelf){
    BooksAPI.update(book, shelf).then((books) => {            
            this.updateBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <BookSearch updateBooks={(book, shelf) => this.changeShelf(book,shelf)} books={this.state.books} />
        }/>
        <Route exact path='/' render={() => 
          <BookList updateBooks={(book,shelf) => this.changeShelf(book,shelf)} books={this.state.books} />
        }/>
      </div>
    )
  }
}

export default BooksApp
