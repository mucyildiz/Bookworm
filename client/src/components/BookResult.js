import './BookResult.css';
import BookButton from './BookButton';
import { Link } from 'react-router-dom';

const BookResult = props => {
  const body = {
    bookInfo: {
      bookId: props.bookId,
      imgUrl: props.imgUrl,
      title: props.title,
      author: props.author,
      description: props.description,
    }
  }

  const handleClick = () => {
    if (props.toggleMenu) {
      props.toggleMenu();
    }
  }

  return (
    <div onClick={handleClick} className='book-result-container'>
        <Link to={{pathname: `/book/id=${props.bookId}`}} >
          <div className='left'>
            <img className='book-img' src={props.imgUrl} alt='' />
            <div className='book-info'>
              <div className='title'>{props.title}</div>
              <div>{props.author}</div>
            </div>
          </div>
        </Link>
        {!props.inSearchBar && <BookButton alreadyInLibrary={props.alreadyInLibrary} body={body}/> }
    </div>
  )
}

export default BookResult;