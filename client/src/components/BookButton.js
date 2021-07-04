import './BookButton.css';
import axios from 'axios';
import { useState } from 'react';

const BookButton = props => {
  // alreadyInLibrary is check from SearchResults.js and isInLibrary is check from Library.js
  // former checks to see what button we should display for search results
  // latter checks to see if we are in library in which case isInLibrary should always be true
  const [ isInLibrary, setIsInLibrary ] = useState(props.alreadyInLibrary || props.isInLibrary);
  const body = props.body;

  const addBookToLibrary = async () => {
    setIsInLibrary(true);
    await axios.put('/api/addbook', body);
  }

  const removeBookFromLibrary = async () => {
    setIsInLibrary(false);
    if(props.handleClick){
      props.handleClick();
    }
    await axios.put('/api/removebook', body);
  }

  return (
    <div>
      {isInLibrary ? 
        <div onClick={removeBookFromLibrary} className='removeable-book-button book-button'>Remove Book</div> :
        <div onClick={addBookToLibrary} className='book-button'>Add Book to Library</div>
      }
    </div>
  )
}

export default BookButton;
