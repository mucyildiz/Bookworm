import './BookResult.css';
import axios from 'axios';
import { useState } from 'react';

const BookResult = props => {
  const [ hidden, setHidden ] = useState(false);

  const bookInfo = {bookInfo: {
    bookId: props.bookId,
    imgUrl: props.imgUrl,
    title: props.title,
    author: props.author,
    description: props.description,
  }}

  const addBookToLibrary = async () => {
    await axios.put('/api/addbook', bookInfo);
  }

  const removeBookFromLibrary = async () => {
    setHidden(true);
    await axios.put('/api/removebook', bookInfo);
  }

  if(props.isInLibrary) {
    return (
      <>
      {hidden ? <div></div> :
        <div className='library-book'>
          <img className='library-book-img' src={props.imgUrl} alt='' />
          <div className='library-book-title'>{props.title}</div>
          <div className='library-book-author'>{props.author}</div>
          <div onClick={removeBookFromLibrary} className='book-button'>Remove Book</div>
        </div>
      }
      </>
    )
  }

  return (
    <div className='book-result-container'>
        <div className='left'>
          <img className='book-img' src={props.imgUrl} alt='' />
          <div className='book-info'>
            <div className='title'>{props.title}</div>
            <div>{props.author}</div>
          </div>
        </div>
        <div>
          {props.isSearchResult &&
            <div onClick={addBookToLibrary} className='book-button'>Add Book to Library</div>
          }
        </div>
    </div>
  )
}

export default BookResult;