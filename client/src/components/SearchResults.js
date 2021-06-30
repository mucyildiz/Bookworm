import './SearchResults.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { pick } from 'lodash';
import BookResult from './BookResult';

const SearchResults = props => {
  //NOTE: assumes only one query parameter in url
  const query = decodeURIComponent(window.location.pathname.split('q=')[1]);
  const key = props.apiKey;

  const [bookResults, setBookResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${key}`)
      const data = await res.data;
      let books = data.items.map(book => (
        pick(book, ['id', 'volumeInfo'])
      ));
      const booksNoDuplicates = filterDuplicates(books);
      setBookResults(booksNoDuplicates);
    }
    fetchData();
  }, [query])

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

  return (
    <div id='search-results-container'>
      <div className="search-results-header">
        <h1>Search Results for '{query}'</h1>
      </div>
      <ul className='search-result-books'>
        {bookResults.map(book => (
          <li key={book.id}>
            <BookResult 
            bookId={book.id}
            title={book.volumeInfo.title}
            subtitle={book.volumeInfo.subtitle}
            imgUrl={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : '/images/placeholderbook.svg'}
            author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}
            isSearchResult={true}
            isInLibrary={false}
            />
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default SearchResults;