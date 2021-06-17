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
      let index = noDuplicateArr.findIndex(obj => obj.id === item.id);
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
    console.log(bookResults);
  }

  const handleInput = async e => {
    setSearchQuery(e.target.value);
    
    if(!searchQuery) {
      setBookResults([]);
    }
    else {
      await getResults(searchQuery)
    }

  }

  return (
    <>
      <form id='searchbar' action='/' method='GET'>
          <input
          value={searchQuery}
          onInput={handleInput}
          type="text"
          id="book-search"
          placeholder="Search books"
          name="search" 
          />
          <img src='/images/searchicon.svg' alt='search'/>
      </form>
      <div id='results'>
        {bookResults.length > 0 &&
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