import logo from './logo.svg';
import './App.css';
import './styles/reset.css';
import React from 'react';

// import { BookList } from './components/Booklist';
// import { ItemCounter } from './components/ItemCounter';
import { Header } from './components/Header';


// const books = [
//   {
//     "isbn": "9781593279509", "title": "Eloquent JavaScript, Third Edition", "subtitle": "A Modern Introduction to Programming", "author": "Marijn Haverbeke", "published": "2018-12-04T00:00:00.000Z", "publisher": "No Starch Press", "pages": 472, "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.", "website": "http://eloquentjavascript.net/"
//   },
//   {
//     "isbn": "9781491943533", "title": "Practical Modern JavaScript", "subtitle": "Dive into ES6 and the Future of JavaScript", "author": "Nicolás Bevacqua", "published": "2017-07-16T00:00:00.000Z", "publisher": "O'Reilly Media", "pages": 334, "description": "To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.", "website": "https://github.com/mjavascript/practical-modern-javascript"
//   },
// ];

function App() {
  return (
    <div className="App">
      <Header/>


      {/* <BookList data={books} />
      <ItemCounter start = {1} /> */}
      </div>
  );
}

export default App;