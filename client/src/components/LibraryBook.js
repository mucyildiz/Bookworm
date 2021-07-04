import './LibraryBook.css';
import { useState } from 'react';
import BookButton from './BookButton';

const LibraryBook = props => {
  const [ hidden, setHidden ] = useState(false);

  const body = {bookInfo: {
    bookId: props.bookId,
    imgUrl: props.imgUrl,
    title: props.title,
    author: props.author,
    description: props.description,
  }};

  const handleClick = () => {
    setHidden(true);
  }

  return (
    <>
    {hidden ? <div></div> :
      <div className='library-book'>
        <img className='library-book-img' src={props.imgUrl} alt='' />
        <div className='library-book-title'>{props.title}</div>
        <div className='library-book-author'>{props.author}</div>
        <BookButton handleClick={handleClick} body={body} isInLibrary={true} />
      </div>
    }
    </>
  )
}

export default LibraryBook;