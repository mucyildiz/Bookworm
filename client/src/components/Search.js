import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BookResult from './BookResult';
import { pick } from 'lodash';
import { useHistory } from 'react-router-dom';
import './Search.css';

const Search = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState([])
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const wrapperRef = useRef(null);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = e => {
        if(ref.current && !ref.current.contains(e.target)) {
          setBookResults([]);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      } 
    }, [ref])
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    const getData = async () => {
      if(debouncedSearchTerm) {
        setIsLoading(true);
        const results = await getResults(debouncedSearchTerm);
        setIsLoading(false);
        setBookResults(results);
      }
      else{
        setBookResults([]);
        setIsLoading(false);
      }
  }
  getData();
  }, [debouncedSearchTerm] )

  const filterDuplicates = arr => {
    if(arr === undefined) {
      return [];
    }
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
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${props.googleAPIKey}`)
    const data = await res.data;
    if(data.items === undefined) {
      return [];
    }
    let books = data.items.map(book => (
      pick(book, ['id', 'volumeInfo'])
    ));
    const booksNoDuplicates = filterDuplicates(books);
    return booksNoDuplicates;
  }

  const handleInput = async e => {
    setSearchQuery(e.target.value);
  }

  const history = useHistory();
  const onSubmit = e => {
    if(props.toggleMenu) {
      props.toggleMenu();
    }
    if(!searchQuery) {
      e.preventDefault();
      return;
    }
    history.push(`/searchresults/q=${searchQuery}`);
    setSearchQuery('');
    e.preventDefault();
  }

  return (
    <div ref={wrapperRef} id='searchbar'>
      <form id='searchbox' action='/' method='get' onSubmit={onSubmit}>
        <input
        value={searchQuery}
        onInput={handleInput}
        type="text"
        id="book-search"
        placeholder="Search books"
        />
        {isLoading ? <div className="lds-dual-ring"></div> :
        <input type='image' id='search-icon' src='/images/searchicon.svg' alt='search' /> }
      </form>
        <div id='results'>
        {!isLoading &&
          <ul>
            {bookResults.map(book => (
              <li key={book.id}>
                <BookResult 
                bookId={book.id}
                title={book.volumeInfo.title}
                subtitle={book.volumeInfo.subtitle}
                imgUrl={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : '/images/placeholderbook.svg'}
                author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}
                inSearchBar={true}
                toggleMenu = {props.toggleMenu}
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

const useDebounce = (query, delay) => {
  const [debouncedValue, setDebouncedValue ] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return debouncedValue;
}

export default Search;