import './Library.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookResult from './BookResult';

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
        <h1>Your Library</h1>
      </div>
      <ul className='library-books'>
        {library.map(book => (
          <li key={book.bookId}>
            <BookResult 
            bookId={book.bookId}
            title={book.title}
            imgUrl={book.imgUrl ? book.imgUrl : '/images/placeholderbook.svg'}
            author={book.author ? book.author : ''}
            description={book.description}
            isInLibrary={true}
            />
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default Library;