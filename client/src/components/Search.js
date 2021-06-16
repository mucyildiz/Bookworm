import { useState } from 'react';
import axios from 'axios';
import BookResult from './BookResult';
import { pick } from 'lodash';

const Search = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState([])

  const getResults = async (query) => {
    setIsLoading(true);
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${props.googleAPIKey}`)
    const data = await res.data;
    const books = data.items.map(book => (
      pick(book, ['id', 'volumeInfo'])
    ));
    setIsLoading(false);
    setBookResults(books);
  }

  const handleInput = async e => {
    setSearchQuery(e.target.value);
    
    if(searchQuery.length > 1){
      await getResults(searchQuery);
    }
    // make books empty because when user starts searching again after clearing query itll show results from last search
    else{
      setBookResults([]);
    }
  }

  return (
    <>
    <form action='/' method='GET'>
        <input
        value={searchQuery}
        onInput={handleInput}
        type="text"
        id="book-search"
        placeholder="Search books"
        name="search" 
        />
        <button type="submit">Search</button>
    </form>
    <div id='results'>
      {bookResults &&
      <ul>
          {bookResults.map(book => (
            <li key={book.id}>
              <BookResult 
              bookId={book.id}
              title={book.volumeInfo.title}
              subtitle={book.volumeInfo.subtitle}
              imgUrl={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : '/images/placeholderbook.svg'}
              author={book.volumeInfo.authors ? book.volumeInfo.authors.join('') : ''}
              />
            </li>
          ))}
      </ul>
      }
    </div>
    </>
  )
}

export default Search;