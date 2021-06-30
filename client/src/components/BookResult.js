import './BookResult.css';
import axios from 'axios';
//  '/api/addbook'

const BookResult = props => {

  const bookInfo = {bookInfo: {
    imgUrl: props.imgUrl,
    title: props.title,
    author: props.author,
  }}

  const addBookToLibrary = async () => {
    await axios.put('/api/addbook', bookInfo);
  }

  return (
    <div className='book-result-container'>
      <div className='left'>
        <img className='book-img' src={props.imgUrl} alt='' />
        <div className='book-info'>
          <div className='title'>{props.title}</div>
          <div>{props.author}</div>
        </div>
      </div>
      <div>
        {props.isSearchResult &&
          <div onClick={addBookToLibrary} className='add-book-button'>Add Book to Library</div>
        }
      </div>
    </div>
  )
}

export default BookResult;