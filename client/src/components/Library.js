import './Library.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryBook from './LibraryBook';

const Library = (props) => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/getlibrary');
      const userLibrary = res.data;
      setLibrary(userLibrary);
    }
    fetchData();
  }, [])


  return (
    <div id='library-container'>
      <div className="library-header">
        <h1>{props.name}'s Library</h1>
      </div>
      {library.length > 0 ?
      <ul className='library-books'>
        {library.map(book => (
          <li key={book.bookId}>
            <LibraryBook
            bookId={book.bookId}
            title={book.title}
            imgUrl={book.imgUrl ? book.imgUrl : '/images/placeholderbook.svg'}
            author={book.author ? book.author : ''}
            description={book.description}
            />
          </li>
        ))
      }
      </ul> : <div className='no-books-message'>You don't have any books in your library. Find some by searching for them or getting recommendations!</div> }
    </div>
  )
}

export default Library;