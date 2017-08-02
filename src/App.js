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
      // console.log(books)
    })
    
  }

  componentDidMount(){
    this.updateBooks()
    console.log("App did mount")
  }

  changeShelf(book, shelf){
    BooksAPI.update(book, shelf).then((books) => {            
            this.setState({books})
            console.log("App change")
    })
  }

  // componentWillUpdate(){
  //   BooksAPI.getAll().then(books => {
  //     this.setState({books})
  //   })
  //   console.log("App will update")
  // }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <BookSearch updateBooks={() => this.changeShelf()} books={this.state.books} />
        }/>
        <Route exact path='/' render={() => 
          <BookList updateBooks={this.changeShelf} books={this.state.books} />
        }/>
      </div>
    )
  }
}

export default BooksApp
