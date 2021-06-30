import { useState } from 'react';
import axios from 'axios';
import BookResult from './BookResult';
import { pick } from 'lodash';
import './Search.css';

const Search = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState([])

  const filterDuplicates = arr => {
    let noDuplicateArr = [];
    for(let item of arr) {
      let index = noDuplicateArr.findIndex(obj => obj.id === item.id || 
        // different publishers etc. will publish same classic books so we might have two of same book with different id's
        // so we check for equal titles and equal authors and remove duplicates in such scenarios
        // but some records don't have authors so we must first check to see if authors property exists
        (obj.volumeInfo.title === item.volumeInfo.title && (obj.volumeInfo.authors && item.volumeInfo.authors) ? 
        obj.volumeInfo.authors[0] === item.volumeInfo.authors[0] : false) || 
        // data with long title tends to be journals and academic papers or government stuff, not really books
        item.volumeInfo.title.length > 70);
      if(index === -1) {
        noDuplicateArr.push(item);
      }
    }
    return noDuplicateArr;
  }

  const getResults = async (query) => {
    setIsLoading(true);
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${props.googleAPIKey}`)
    const data = await res.data;
    let books = data.items.map(book => (
      pick(book, ['id', 'volumeInfo'])
    ));
    const booksNoDuplicates = filterDuplicates(books);
    setIsLoading(false);
    setBookResults(booksNoDuplicates);
    console.log('data', data);
  }

  const handleInput = async e => {
    setSearchQuery(e.target.value);
    await getResults(searchQuery)
  }

  return (
    <div id='searchbar' action='/' method='GET'>
      <div id='searchbox'>
        <input
        value={searchQuery}
        onInput={handleInput}
        type="text"
        id="book-search"
        placeholder="Search books"
        name="search" 
        />
        <img id='search-icon' src='/images/searchicon.svg' alt='search' />
      </div>
        <div id='results'>
        {searchQuery && bookResults &&
          <ul>
            {bookResults.map(book => (
              <li key={book.id}>
                <BookResult 
                bookId={book.id}
                title={book.volumeInfo.title}
                subtitle={book.volumeInfo.subtitle}
                imgUrl={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : '/images/placeholderbook.svg'}
                author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}
                />
              </li>
            ))
          }
          </ul>
        }
        </div>
    </div>
  )
}

export default Search;