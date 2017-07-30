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
  
  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  // componentWillUpdate(){
  //   BooksAPI.getAll().then(books => {
  //     this.setState({books})
  //   })
  // }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <BookSearch books={this.state.books} />
        }/>
        <Route exact path='/' render={() => 
          <BookList books={this.state.books} />
        }/>
      </div>
    )
  }
}

export default BooksApp
