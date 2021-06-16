import axios from 'axios';
import { useEffect, useState } from 'react';
import './BookResult.css';

const BookResult = props => {

  const addBookToLibrary = async () => {
    const bookInfo = {
      id: props.bookId,
      title: props.title,
      subtitle: props.subtitle,
      imgUrl: props.imgUrl,
      author: props.author
    };
    console.log('here');
    await axios.put('/api/addbook', { bookInfo });
  }

  return (
    <div className='book-result-container'>
      <img src={props.imgUrl} className='book-img' alt=''/>
      <div className='book-info'>
        <div>{props.title}</div>
        <div>{props.subtitle && props.subtitle}</div>
        <div>{props.author}</div>
      </div>
      <button onClick={addBookToLibrary} className='add-book btn'>Add Book to Library</button>
    </div>
  )
}

export default BookResult;