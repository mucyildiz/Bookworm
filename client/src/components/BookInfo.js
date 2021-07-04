import './BookInfo.css';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import BookButton from './BookButton';
import { pick } from 'lodash';

const BookInfo = props => {
  let bookID = decodeURIComponent(window.location.pathname.split('id=')[1]);
  const [ bookInfo, setBookInfo ] = useState({});
  const [ invalidID, setInvalidID ] = useState(false);
  const [ alreadyInLibrary, setAlreadyInLibrary ] = useState(false);
  const [ body, setBody ] = useState({});

  useEffect(() => {

    const checkInLibrary = async () => {
      const res = await axios.get('/api/getlibrary');
      const data = await res.data;
      const libraryBookIDs = data.map(book => book.bookId);
      if(libraryBookIDs.includes(bookID)) {
        setAlreadyInLibrary(true);
      }
    }

    const fetchData = async () => {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookID}`);
      const data = await res.data;
      if(data === undefined) {
        setInvalidID(true);
        return;
      }
      const bookInformation = pick(data.items[0].volumeInfo, 
        ['authors', 'averageRating', 'categories', 'description', 'imageLinks', 'publishedDate', 'title', 'subtitle']
      )

      // this is for button prop, we do small thumbnail for consistency with rest of images in database
      const body = {bookInfo: {
        bookId: bookID,
        imgUrl: bookInformation.imageLinks ? bookInformation.imageLinks.smallThumbnail : '',
        title: bookInformation.title,
        author: bookInformation.authors ? bookInformation.authors[0] : '',
        description: bookInformation.description,
      }};

      setBody(body);
      setBookInfo(bookInformation);
    }
    checkInLibrary();
    fetchData();
  }, [bookID, alreadyInLibrary]);

  return (
    <div id='info-container'>
      {invalidID ? <div className='info-title'>Page not found.</div> :
      <div id='info'>
        <div className='info-title'>{bookInfo.title}</div>
        <div className='info-subtitle'>{bookInfo.subtitle || ''}</div>
        <img className='info-book-pic' src={bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : '/images/placeholderbook.svg'} alt='book cover'/>
        <div className='info-author'>by {bookInfo.authors ? bookInfo.authors[0] : ''}</div>
        <br></br>
        <div className='info-description'>{bookInfo.description}</div>
        <br></br>
        <BookButton key={alreadyInLibrary} alreadyInLibrary={alreadyInLibrary} body={body} />
      </div>
      }
    </div>
  )
}

export default BookInfo;