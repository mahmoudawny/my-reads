import React from 'react'
import ReactDOM from 'react-dom'
import BookApp from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<BrowserRouter><BookApp /></BrowserRouter>, document.getElementById('root'))
